package com.camerondix.carteira.model;

import static org.assertj.core.api.AssertionsForClassTypes.assertThatCode;
import static org.assertj.core.api.AssertionsForClassTypes.assertThatThrownBy;

import org.assertj.core.api.ThrowableAssert.ThrowingCallable;
import org.junit.jupiter.api.Test;

import com.camerondix.carteira.model.entity.Category;

class CategoryTest {

	// given
	String name = "name";

	@Test
	void builderSuccess() {

		// when
		ThrowingCallable actual = () -> Category.builder().name(name).build();

		// then
		assertThatCode(actual).doesNotThrowAnyException();
	}

	@Test
	void builderFailNameIsNull() {

		// when
		ThrowingCallable actual = () -> Category.builder().build();

		// then
		assertThatThrownBy(actual).isInstanceOf(NullPointerException.class).hasMessageStartingWith("name");
	}
}
