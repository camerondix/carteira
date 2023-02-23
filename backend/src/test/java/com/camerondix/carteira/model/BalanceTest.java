package com.camerondix.carteira.model;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.assertj.core.api.AssertionsForClassTypes.assertThatCode;
import static org.assertj.core.api.AssertionsForClassTypes.assertThatThrownBy;
import static org.mockito.Mockito.mock;

import java.time.LocalDateTime;

import org.assertj.core.api.ThrowableAssert.ThrowingCallable;
import org.junit.jupiter.api.Test;

import com.camerondix.carteira.model.entity.Account;
import com.camerondix.carteira.model.entity.Balance;

class BalanceTest {

	// given
	Account account = mock(Account.class);
	LocalDateTime timestamp = LocalDateTime.now();

	@Test
	void builderSuccess() {

		// when
		ThrowingCallable actual = () -> Balance.builder().account(account).timestamp(timestamp).build();

		// then
		assertThatCode(actual).doesNotThrowAnyException();
	}

	@Test
	void builderFailAccountIsNull() {

		// when
		ThrowingCallable actual = () -> Balance.builder().timestamp(timestamp).build();

		// then
		assertThatThrownBy(actual).isInstanceOf(NullPointerException.class).hasMessageStartingWith("account");
	}

	@Test
	void builderFailTimestampIsNull() {

		// when
		ThrowingCallable actual = () -> Balance.builder().account(account).build();

		// then
		assertThatThrownBy(actual).isInstanceOf(NullPointerException.class).hasMessageStartingWith("timestamp");
	}

	@Test
	void valuesAreEqualSuccess() {

		// given
		var one = 1f;
		var two = 2f;
		var three = 3f;
		var balance1 = Balance.builder().account(account).timestamp(timestamp)
				.current(one)
				.available(two)
				.limit(three).build();
		var balance2 = Balance.builder().account(account).timestamp(timestamp)
				.current(one)
				.available(two)
				.limit(three).build();
		var balance3 = Balance.builder().account(account).timestamp(timestamp)
				.current(three)
				.available(two)
				.limit(three).build();
		var balance4 = Balance.builder().account(account).timestamp(timestamp)
				.current(one)
				.available(two)
				.limit(one).build();
		var balance5 = Balance.builder().account(account).timestamp(timestamp)
				.current(one)
				.available(one)
				.limit(three)
				.build();

		// when
		var actual1 = balance1.valuesAreEqual(balance2);
		var actual2 = balance1.valuesAreEqual(balance3);
		var actual3 = balance1.valuesAreEqual(balance4);
		var actual4 = balance1.valuesAreEqual(balance5);

		// then
		assertThat(actual1).isTrue();
		assertThat(actual2).isFalse();
		assertThat(actual3).isFalse();
		assertThat(actual4).isFalse();
	}

	@Test
	void valuesAreEqualFailBalanceIsNull() {

		// given
		var one = 1f;
		var two = 2f;
		var three = 3f;
		var balance1 = Balance.builder()
				.account(account)
				.timestamp(timestamp)
				.current(one)
				.available(two)
				.limit(three)
				.build();
		Balance balance2 = null;

		// when
		ThrowingCallable actual = () -> balance1.valuesAreEqual(balance2);

		// then
		assertThatThrownBy(actual).isInstanceOf(NullPointerException.class).hasMessageStartingWith("balance");
	}
}
