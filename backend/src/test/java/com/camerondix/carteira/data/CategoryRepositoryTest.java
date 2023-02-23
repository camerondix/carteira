package com.camerondix.carteira.data;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import com.camerondix.carteira.model.entity.Category;

@DataJpaTest
public class CategoryRepositoryTest {

    @Autowired
    private CategoryRepository underTest;

    // given
    String name = "name";

    Category expected = Category.builder().name(name).build();

    @BeforeEach
    void setUp() {

        expected = underTest.save(expected);
    }

    @Test
    void testGetReferenceByName() {

        // when
        var actual = underTest.getReferenceByName(name);

        // then
        assertThat(actual).isEqualTo(expected);
    }
}
