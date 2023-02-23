package com.camerondix.carteira.service;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.assertj.core.api.AssertionsForClassTypes.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.NoSuchElementException;

import org.assertj.core.api.ThrowableAssert.ThrowingCallable;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.core.io.ResourceLoader;

import com.camerondix.carteira.data.CategoryRepository;
import com.camerondix.carteira.model.entity.Category;

@ExtendWith(MockitoExtension.class)
public class CategoryServiceTest {

    private CategoryService underTest;

    @Mock
    private CategoryRepository categoryRepository;

    @Mock
    private ResourceLoader resourceLoader;

    @BeforeEach
    void setUp() {

        when(categoryRepository.count()).thenReturn(1l);
        underTest = new CategoryService(categoryRepository, resourceLoader);
    }

    @Test
    void testRetrieveReferenceByNameSuccess() {

        // given
        var name = "name";

        when(categoryRepository.getReferenceByName(anyString())).thenReturn(mock(Category.class));

        // when
        underTest.retrieveReferenceByName(name);

        // then
        var capture = ArgumentCaptor.forClass(String.class);
        verify(categoryRepository, times(2)).getReferenceByName(capture.capture());
        assertThat(capture.getAllValues().get(1)).isEqualTo(name);
    }

    @Test
    void testRetrieveReferenceByNameUncategorized() {

        // given
        var name = CategoryService.UNCATEGORIZED_NAME;

        when(categoryRepository.getReferenceByName(name)).thenReturn(mock(Category.class));

        // when
        underTest.retrieveReferenceByName(name);

        // then
        var capture = ArgumentCaptor.forClass(String.class);
        verify(categoryRepository, times(2)).getReferenceByName(capture.capture());
        assertThat(capture.getAllValues().get(1)).isEqualTo(name);
    }

    @Test
    void testRetrieveReferenceByNameFailNotFound() {

        // given
        var name = "name";

        when(categoryRepository.getReferenceByName(anyString())).thenReturn(null);

        // when
        ThrowingCallable actual = () -> underTest.retrieveReferenceByName(name);

        // then
        assertThatThrownBy(actual).isInstanceOf(NoSuchElementException.class);
    }

    @Test
    void testRetrieveReferenceByNameFailExternalIdIsNull() {

        // when
        ThrowingCallable actual = () -> underTest.retrieveReferenceByName(null);

        // then
        assertThatThrownBy(actual).isInstanceOf(NullPointerException.class).hasMessageContaining("name");
    }
}
