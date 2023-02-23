package com.camerondix.carteira.model;

import static org.assertj.core.api.AssertionsForClassTypes.assertThatCode;
import static org.assertj.core.api.AssertionsForClassTypes.assertThatThrownBy;

import org.assertj.core.api.ThrowableAssert.ThrowingCallable;
import org.junit.jupiter.api.Test;

class TransactionUpdateTest {

	// given
	String token = "token";

	@Test
	void builderSuccess() {

		// when
		ThrowingCallable actual = () -> TransactionUpdate.builder().token(token).build();

		// then
		assertThatCode(actual).doesNotThrowAnyException();
	}

	@Test
	void builderFailTokenIsNull() {

		// when
		ThrowingCallable actual = () -> TransactionUpdate.builder().build();

		// then
		assertThatThrownBy(actual).isInstanceOf(NullPointerException.class).hasMessageStartingWith("token");
	}
}
