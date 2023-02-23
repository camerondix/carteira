package com.camerondix.carteira.data;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import com.camerondix.carteira.model.entity.PlaidItem;

@DataJpaTest
public class PlaidItemRepositoryTest {

    @Autowired
    private PlaidItemRepository underTest;

    String plaidId = "plaidId";

    // given
    PlaidItem expected = PlaidItem.builder().plaidId(plaidId).accessToken("accessToken").build();

    @BeforeEach
    void setUp() {

        expected = underTest.save(expected);
    }

    @Test
    void testFindByPlaidId() {

        // when
        var actual = underTest.findByPlaidId(plaidId).get();

        // then
        assertThat(actual).isEqualTo(expected);
    }
}
