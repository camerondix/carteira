package com.camerondix.carteira.model;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.assertj.core.api.AssertionsForClassTypes.assertThatThrownBy;

import org.assertj.core.api.ThrowableAssert.ThrowingCallable;
import org.junit.jupiter.api.Test;

import com.camerondix.carteira.model.entity.AccountSubtype;

class AccountSubtypeTest {

    @Test
    void fromValueSuccess() {

        // given
        var expected = AccountSubtype.CHECKING;
        var value = expected.getValue();

        // when
        var actual = AccountSubtype.fromValue(value);

        // then
        assertThat(actual).isEqualTo(AccountSubtype.CHECKING);
    }

    @Test
    void fromValueSuccessEnumUnknown() {

        // given
        var expected = AccountSubtype.ENUM_UNKNOWN;
        String value = "fakeAccountSubtype";

        // when
        var actual = AccountSubtype.fromValue(value);

        // then
        assertThat(actual).isEqualTo(expected);
    }

    @Test
    void fromValueFailValueIsNull() {

        // given
        String value = null;

        // when
        ThrowingCallable actual = () -> AccountSubtype.fromValue(value);

        // then
        assertThatThrownBy(actual).isInstanceOf(NullPointerException.class).hasMessageStartingWith("value");
    }
}
