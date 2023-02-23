package com.camerondix.carteira.service;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.time.LocalDateTime;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.camerondix.carteira.data.BalanceRepository;
import com.camerondix.carteira.model.entity.Account;
import com.camerondix.carteira.model.entity.AccountSubtype;
import com.camerondix.carteira.model.entity.AccountType;
import com.camerondix.carteira.model.entity.Balance;

@ExtendWith(MockitoExtension.class)
public class BalanceServiceTest {

	private BalanceService underTest;

	@Mock
	private AccountService accountService;

	@Mock
	private BalanceRepository balanceRepository;

	@BeforeEach
	void setUp() {

		underTest = new BalanceService(balanceRepository, accountService);
	}

	@Test
	void testCreateAllIfChanged() {

		// given
		var account1 = Account.builder()
				.officialName("officialName1")
				.name("name1")
				.type(AccountType.ENUM_UNKNOWN)
				.subtype(AccountSubtype.ENUM_UNKNOWN)
				.build();

		var account2 = Account.builder()
				.officialName("officialName2")
				.name("name2")
				.type(AccountType.ENUM_UNKNOWN)
				.subtype(AccountSubtype.ENUM_UNKNOWN)
				.build();

		var balance1 = Balance.builder()
				.account(account1)
				.timestamp(LocalDateTime.now())
				.build();

		var balance2 = Balance.builder()
				.account(account2)
				.timestamp(LocalDateTime.now())
				.build();

		var updatedAccount = Account.builder()
				.officialName("officialName1")
				.name("name1")
				.type(AccountType.ENUM_UNKNOWN)
				.subtype(AccountSubtype.ENUM_UNKNOWN)
				.currentBalance(balance1)
				.build();

		account2.setCurrentBalance(balance2);

		var balances = List.of(balance1, balance2);

		when(balanceRepository.save(balance1)).thenReturn(balance1);

		// when
		underTest.createAllIfChanged(balances);

		// then
		var balanceCapture = ArgumentCaptor.forClass(Balance.class);
		verify(balanceRepository, times(2)).save(balanceCapture.capture());
		assertThat(balanceCapture.getAllValues()).isEqualTo(balances);

		var accountCapture = ArgumentCaptor.forClass(Account.class);
		verify(accountService).update(accountCapture.capture());
		assertThat(accountCapture.getValue()).usingRecursiveComparison().isEqualTo(updatedAccount);
	}
}
