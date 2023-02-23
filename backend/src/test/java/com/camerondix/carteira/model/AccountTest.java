package com.camerondix.carteira.model;

import static org.assertj.core.api.AssertionsForClassTypes.assertThatCode;
import static org.assertj.core.api.AssertionsForClassTypes.assertThatThrownBy;

import org.assertj.core.api.ThrowableAssert.ThrowingCallable;
import org.junit.jupiter.api.Test;

import com.camerondix.carteira.model.entity.Account;
import com.camerondix.carteira.model.entity.AccountSubtype;
import com.camerondix.carteira.model.entity.AccountType;

class AccountTest {

	// given
	String officialName = "officialName";
	String name = "name";
	AccountType type = AccountType.ENUM_UNKNOWN;
	AccountSubtype subtype = AccountSubtype.ENUM_UNKNOWN;

	@Test
	void builderSuccess() {

		// when
		ThrowingCallable actual = () -> Account.builder().officialName(officialName)
				.name(name).type(type).subtype(subtype).build();

		// then
		assertThatCode(actual).doesNotThrowAnyException();
	}

	@Test
	void builderFailOfficialNameIsNull() {

		// when
		ThrowingCallable actual = () -> Account.builder().name(name).type(type)
				.subtype(subtype).build();

		// then
		assertThatThrownBy(actual).isInstanceOf(NullPointerException.class).hasMessageStartingWith("officialName");
	}

	@Test
	void builderFailNameIsNull() {

		// when
		ThrowingCallable actual = () -> Account.builder().officialName(officialName).type(type).subtype(subtype)
				.build();

		// then
		assertThatThrownBy(actual).isInstanceOf(NullPointerException.class).hasMessageStartingWith("name");
	}

	@Test
	void builderFailTypeIsNull() {

		// when
		ThrowingCallable actual = () -> Account.builder().officialName(officialName).name(name).subtype(subtype)
				.build();

		// then
		assertThatThrownBy(actual).isInstanceOf(NullPointerException.class).hasMessageStartingWith("type");
	}

	@Test
	void builderFailSubtypeIsNull() {

		// when
		ThrowingCallable actual = () -> Account.builder().officialName(officialName).name(name).type(type).build();

		// then
		assertThatThrownBy(actual).isInstanceOf(NullPointerException.class).hasMessageStartingWith("subtype");
	}
}
