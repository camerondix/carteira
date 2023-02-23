package com.camerondix.carteira.model;

import static org.assertj.core.api.AssertionsForClassTypes.assertThatCode;
import static org.assertj.core.api.AssertionsForClassTypes.assertThatThrownBy;

import org.assertj.core.api.ThrowableAssert.ThrowingCallable;
import org.junit.jupiter.api.Test;

import com.camerondix.carteira.model.entity.PlaidItem;

class PlaidItemTest {

	// given
	String plaidId = "plaidId";
	String accessToken = "accessToken";

	@Test
	void builderSuccess() {

		// when
		ThrowingCallable actual = () -> PlaidItem.builder().plaidId(plaidId).accessToken(accessToken).build();

		// then
		assertThatCode(actual).doesNotThrowAnyException();
	}

	@Test
	void builderFailPlaidIdIsNull() {

		// when
		ThrowingCallable actual = () -> PlaidItem.builder().accessToken(accessToken).build();

		// then
		assertThatThrownBy(actual).isInstanceOf(NullPointerException.class).hasMessageStartingWith("plaidId");
	}

	@Test
	void builderFailAccessTokenIsNull() {

		// when
		ThrowingCallable actual = () -> PlaidItem.builder().plaidId(plaidId).build();

		// then
		assertThatThrownBy(actual).isInstanceOf(NullPointerException.class).hasMessageStartingWith("accessToken");
	}
}
