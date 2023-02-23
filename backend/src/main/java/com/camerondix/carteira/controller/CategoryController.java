package com.camerondix.carteira.controller;

import java.util.List;

import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.graphql.data.method.annotation.SchemaMapping;
import org.springframework.stereotype.Controller;

import com.camerondix.carteira.model.entity.Category;
import com.camerondix.carteira.service.CategoryService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
public class CategoryController {

    private final CategoryService categoryService;

    public CategoryController(CategoryService categoryService) {

        log.debug("Initializing category controller");
        this.categoryService = categoryService;
    }

    @QueryMapping
    public Category category(@Argument Integer id) {

        log.info("Getting category from id {}", id);
        return categoryService.retrieveById(id);
    }

    @QueryMapping
    public List<Category> categories() {

        log.debug("Getting categories");
        var categories = categoryService.retrieveAll();
        categories.sort((a1, a2) -> a1.getName().compareTo(a2.getName()));
        return categories;
    }

    @SchemaMapping
    public Category parent(Category category) {

        log.debug("Loading parent category for category {}", category);
        if (category.getParent() == null)
            return null;
        return categoryService.retrieveById(category.getParent().getId());
    }
}
