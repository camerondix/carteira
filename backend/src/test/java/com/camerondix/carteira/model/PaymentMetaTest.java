package com.camerondix.carteira.model;

import static org.assertj.core.api.AssertionsForClassTypes.assertThatCode;

import org.assertj.core.api.ThrowableAssert.ThrowingCallable;
import org.junit.jupiter.api.Test;

import com.camerondix.carteira.model.entity.PaymentMeta;

class PaymentMetaTest {

    @Test
    void builderSuccess() {

        // when
        ThrowingCallable actual = () -> PaymentMeta.builder().build();

        // then
        assertThatCode(actual).doesNotThrowAnyException();
    }
}
