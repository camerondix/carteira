package com.camerondix.carteira.model;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.assertj.core.api.AssertionsForClassTypes.assertThatCode;

import org.assertj.core.api.ThrowableAssert.ThrowingCallable;
import org.junit.jupiter.api.Test;

import com.camerondix.carteira.model.entity.AprType;

class AprTypeTest {

    @Test
    void fromValueSuccess() {

        // given
        var expected = AprType.PURCHASE_APR;
        var value = expected.getValue();

        // when
        var actual = AprType.fromValue(value);

        // then
        assertThat(actual).isEqualTo(expected);
    }

    @Test
    void fromValueSuccessEnumUnknown() {

        // given
        String value = "fakeAprType";

        // when
        ThrowingCallable actual = () -> AprType.fromValue(value);

        // then
        assertThatCode(actual).isInstanceOf(IllegalArgumentException.class);
    }

    @Test
    void fromValueFailValueIsNull() {

        // given
        String value = null;

        // when
        ThrowingCallable actual = () -> AprType.fromValue(value);

        // then
        assertThatCode(actual).isInstanceOf(NullPointerException.class).hasMessageStartingWith("value");
    }
}
