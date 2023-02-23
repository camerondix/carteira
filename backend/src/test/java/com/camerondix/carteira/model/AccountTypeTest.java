package com.camerondix.carteira.model;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.assertj.core.api.AssertionsForClassTypes.assertThatThrownBy;

import org.assertj.core.api.ThrowableAssert.ThrowingCallable;
import org.junit.jupiter.api.Test;

import com.camerondix.carteira.model.entity.AccountType;

class AccountTypeTest {

    @Test
    void fromValueSuccess() {

        // given
        var expected = AccountType.CASH;
        var value = expected.getValue();

        // when
        var actual = AccountType.fromValue(value);

        // then
        assertThat(actual).isEqualTo(expected);
    }

    @Test
    void fromValueSuccessEnumUnknown() {

        // given
        String value = "fakeAccountType";

        // when
        var actual = AccountType.fromValue(value);

        // then
        assertThat(actual).isEqualTo(AccountType.ENUM_UNKNOWN);
    }

    @Test
    void fromValueFailValueIsNull() {

        // given
        String value = null;

        // when
        ThrowingCallable actual = () -> AccountType.fromValue(value);

        // then
        assertThatThrownBy(actual).isInstanceOf(NullPointerException.class).hasMessageStartingWith("value");
    }
}
