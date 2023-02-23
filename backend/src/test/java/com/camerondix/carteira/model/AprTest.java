package com.camerondix.carteira.model;

import static org.assertj.core.api.AssertionsForClassTypes.assertThatCode;
import static org.assertj.core.api.AssertionsForClassTypes.assertThatThrownBy;

import org.assertj.core.api.ThrowableAssert.ThrowingCallable;
import org.junit.jupiter.api.Test;

import com.camerondix.carteira.model.entity.Apr;
import com.camerondix.carteira.model.entity.AprType;

class AprTest {

    // given
    AprType type = AprType.SPECIAL;

    @Test
    void builderSuccess() {

        // when
        ThrowingCallable actual = () -> Apr.builder().type(type).build();

        // then
        assertThatCode(actual).doesNotThrowAnyException();
    }

    @Test
    void builderFailTypeIsNull() {

        // when
        ThrowingCallable actual = () -> Apr.builder().build();

        // then
        assertThatThrownBy(actual).isInstanceOf(NullPointerException.class).hasMessageStartingWith("type");
    }
}
