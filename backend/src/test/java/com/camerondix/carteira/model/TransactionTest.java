package com.camerondix.carteira.model;

import static org.assertj.core.api.AssertionsForClassTypes.assertThatCode;
import static org.assertj.core.api.AssertionsForClassTypes.assertThatThrownBy;
import static org.mockito.Mockito.mock;

import java.time.LocalDateTime;

import org.assertj.core.api.ThrowableAssert.ThrowingCallable;
import org.junit.jupiter.api.Test;

import com.camerondix.carteira.model.entity.Account;
import com.camerondix.carteira.model.entity.Category;
import com.camerondix.carteira.model.entity.Transaction;

class TransactionTest {

	// given
	Account account = mock(Account.class);
	String name = "name";
	LocalDateTime timestamp = LocalDateTime.now();
	Category category = mock(Category.class);

	@Test
	void builderSuccess() {

		// when
		ThrowingCallable actual = () -> Transaction.builder().account(account).name(name).timestamp(timestamp)
				.category(category).build();

		// then
		assertThatCode(actual).doesNotThrowAnyException();
	}

	@Test
	void builderFailAccountIsNull() {

		// when
		ThrowingCallable actual = () -> Transaction.builder().name(name).timestamp(timestamp).category(category)
				.build();

		// then
		assertThatThrownBy(actual).isInstanceOf(NullPointerException.class).hasMessageStartingWith("account");
	}

	@Test
	void builderFailNameIsNull() {

		// when
		ThrowingCallable actual = () -> Transaction.builder().account(account).timestamp(timestamp).category(category)
				.build();

		// then
		assertThatThrownBy(actual).isInstanceOf(NullPointerException.class).hasMessageStartingWith("name");
	}

	@Test
	void builderFailTimestampIsNull() {

		// when
		ThrowingCallable actual = () -> Transaction.builder().account(account).name(name).category(category).build();

		// then
		assertThatThrownBy(actual).isInstanceOf(NullPointerException.class).hasMessageStartingWith("timestamp");
	}

	@Test
	void builderFailCategoryIsNull() {

		// when
		ThrowingCallable actual = () -> Transaction.builder().account(account).name(name).timestamp(timestamp).build();

		// then
		assertThatThrownBy(actual).isInstanceOf(NullPointerException.class).hasMessageStartingWith("category");
	}
}
