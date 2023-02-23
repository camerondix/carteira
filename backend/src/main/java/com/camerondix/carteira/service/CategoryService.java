package com.camerondix.carteira.service;

import java.io.IOException;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Service;

import com.camerondix.carteira.data.CategoryRepository;
import com.camerondix.carteira.exception.CategoryException;
import com.camerondix.carteira.model.entity.Category;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.Getter;
import lombok.NonNull;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class CategoryService {

    public static final String UNCATEGORIZED_NAME = "Uncategorized";

    private final CategoryRepository categoryRepository;

    private final ResourceLoader resourceLoader;

    @Autowired
    public CategoryService(CategoryRepository categoryRepository, ResourceLoader resourceLoader) {

        log.debug("Initializing category service");
        this.categoryRepository = categoryRepository;
        this.resourceLoader = resourceLoader;

        checkSeedCategories();
    }

    private void checkSeedCategories() {

        try {
            if (categoryRepository.count() == 0) {
                log.info("Creating default categories");
                var mapper = new ObjectMapper();
                var initialBaseCategoriesResource = resourceLoader
                        .getResource("classpath:initial_base_categories.json");
                var categoryJsonModels = mapper.readValue(initialBaseCategoriesResource.getInputStream(),
                        new TypeReference<List<CategoryJsonModel>>() {
                        });
                var baseCategories = categoryJsonModels.stream().map(c -> c.toCategory(null))
                        .collect(Collectors.toList());
                createAll(baseCategories);
                var initialCategoriesResource = resourceLoader.getResource("classpath:initial_categories.json");
                categoryJsonModels = mapper.readValue(initialCategoriesResource.getInputStream(),
                        new TypeReference<List<CategoryJsonModel>>() {
                        });
                var categories = categoryJsonModels.stream()
                        .map(c -> c.toCategory(retrieveReferenceByName(c.getParentName())))
                        .collect(Collectors.toList());
                createAll(categories);
            }
        } catch (IOException e) {
            log.error("IO exception prevented create default categories", e);
            throw new CategoryException("IO exception prevented create default categories");
        } catch (RuntimeException e) {
            log.error("Unable to create default categories", e);
            throw new CategoryException("Unable to create default categories");
        }

        try {
            retrieveUncategorizedReference();
        } catch (NoSuchElementException e) {
            log.info("Creating uncategorized category");
            create(Category.builder().name(UNCATEGORIZED_NAME).icon("BsQuestion").build());
        }
    }

    private Category create(@NonNull Category category) {

        log.debug("Creating category {}", category);
        var savedCategory = categoryRepository.save(category);
        log.debug("Created category {}", savedCategory);
        return savedCategory;
    }

    private List<Category> createAll(@NonNull List<Category> categories) {

        log.debug("Creating categories {}", categories);
        var savedCategories = categoryRepository.saveAll(categories);
        log.debug("Created categories {}", savedCategories);
        return savedCategories;
    }

    public Category retrieveById(@NonNull Integer id) {

        log.debug("Retrieving category by id {}", id);
        var category = categoryRepository.findById(id).orElseThrow();
        log.debug("Retrieved category by id {}", category.getId());
        return category;
    }

    public List<Category> retrieveAll() {

        log.debug("Retrieving categories");
        var categories = categoryRepository.findAll();
        log.debug("Retrieved categories {}", categories);
        return categories;
    }

    public Category retrieveReferenceByName(@NonNull String name) {

        log.debug("Retrieving category reference by name {}", name);
        var category = Optional.ofNullable(categoryRepository.getReferenceByName(name))
                .orElseGet(this::retrieveUncategorizedReference);
        log.debug("Retrieved category reference id {}", category.getId());
        return category;
    }

    private Category retrieveUncategorizedReference() {

        log.debug("Retrieving uncategorized category reference {}", UNCATEGORIZED_NAME);
        var category = Optional.ofNullable(categoryRepository.getReferenceByName(UNCATEGORIZED_NAME))
                .orElseThrow();
        log.debug("Retrieved uncategorized category reference id {}", category.getId());
        return category;
    }

    @Getter
    private static class CategoryJsonModel {

        private String name;
        private String description;
        private String parentName;
        private String icon;

        private Category toCategory(Category parent) {

            return Category.builder().name(name).description(description).icon(icon).parent(parent).build();
        }
    }
}
