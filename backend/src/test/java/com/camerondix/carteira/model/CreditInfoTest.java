package com.camerondix.carteira.model;

import static org.assertj.core.api.AssertionsForClassTypes.assertThatCode;

import org.assertj.core.api.ThrowableAssert.ThrowingCallable;
import org.junit.jupiter.api.Test;

import com.camerondix.carteira.model.entity.CreditInfo;

class CreditInfoTest {

    @Test
    void builderSuccess() {

        // when
        ThrowingCallable actual = () -> CreditInfo.builder().build();

        // then
        assertThatCode(actual).doesNotThrowAnyException();
    }
}
