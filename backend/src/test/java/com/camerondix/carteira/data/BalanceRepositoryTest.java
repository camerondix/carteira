package com.camerondix.carteira.data;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

@DataJpaTest
public class BalanceRepositoryTest {

    @Autowired
    private BalanceRepository underTest;

    @Test
    void test() {

        // when
        underTest.count();

        // then
        assertThat(true).isTrue();
    }
}
