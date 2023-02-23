package com.camerondix.carteira.service;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.assertj.core.api.AssertionsForClassTypes.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.security.InvalidParameterException;
import java.util.List;
import java.util.NoSuchElementException;

import org.assertj.core.api.ThrowableAssert.ThrowingCallable;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.camerondix.carteira.data.AccountRepository;
import com.camerondix.carteira.model.entity.Account;
import com.camerondix.carteira.model.entity.AccountSubtype;
import com.camerondix.carteira.model.entity.AccountType;

@ExtendWith(MockitoExtension.class)
public class AccountServiceTest {

    private AccountService underTest;

    @Mock
    private AccountRepository accountRepository;

    @BeforeEach
    void setUp() {

        underTest = new AccountService(accountRepository);
    }

    @Test
    void testCreateSuccess() {

        // given
        var account = Account.builder()
                .officialName("officialName")
                .name("name")
                .type(AccountType.ENUM_UNKNOWN)
                .subtype(AccountSubtype.ENUM_UNKNOWN)
                .build();

        // when
        underTest.create(account);

        // then
        var capture = ArgumentCaptor.forClass(Account.class);
        verify(accountRepository).save(capture.capture());
        assertThat(capture.getValue()).isEqualTo(account);
    }

    @Test
    void testCreateFailAccountIsNull() {

        // when
        ThrowingCallable actual = () -> underTest.create(null);

        // then
        assertThatThrownBy(actual).isInstanceOf(NullPointerException.class).hasMessageContaining("account");
    }

    @Test
    void testCreateAllSuccess() {

        // given
        var accounts = List.of(
                Account.builder()
                        .officialName("officialName1")
                        .name("name1")
                        .type(AccountType.ENUM_UNKNOWN)
                        .subtype(AccountSubtype.ENUM_UNKNOWN)
                        .build(),
                Account.builder()
                        .officialName("officialName2")
                        .name("name2")
                        .type(AccountType.ENUM_UNKNOWN)
                        .subtype(AccountSubtype.ENUM_UNKNOWN)
                        .build());

        // when
        underTest.createAll(accounts);

        // then
        @SuppressWarnings("unchecked")
        ArgumentCaptor<Iterable<Account>> capture = ArgumentCaptor.forClass(Iterable.class);
        verify(accountRepository).saveAll(capture.capture());
        assertThat(capture.getValue()).isEqualTo(accounts);
    }

    @Test
    void testCreateAllFailAccountsAreNull() {

        // when
        ThrowingCallable actual = () -> underTest.createAll(null);

        // then
        assertThatThrownBy(actual).isInstanceOf(NullPointerException.class).hasMessageContaining("accounts");
    }

    @Test
    void testRetrieveReferenceByExternalIdSuccess() {

        // given
        var externalId = "externalId";

        when(accountRepository.getReferenceByExternalId(anyString())).thenReturn(mock(Account.class));

        // when
        underTest.retrieveReferenceByExternalId(externalId);

        // then
        var capture = ArgumentCaptor.forClass(String.class);
        verify(accountRepository).getReferenceByExternalId(capture.capture());
        assertThat(capture.getValue()).isEqualTo(externalId);
    }

    @Test
    void testRetrieveReferenceByExternalIdFailNotFound() {

        // given
        var externalId = "externalId";

        when(accountRepository.getReferenceByExternalId(anyString())).thenReturn(null);

        // when
        ThrowingCallable actual = () -> underTest.retrieveReferenceByExternalId(externalId);

        // then
        assertThatThrownBy(actual).isInstanceOf(NoSuchElementException.class);
    }

    @Test
    void testRetrieveReferenceByExternalIdFailExternalIdIsNull() {

        // when
        ThrowingCallable actual = () -> underTest.retrieveReferenceByExternalId(null);

        // then
        assertThatThrownBy(actual).isInstanceOf(NullPointerException.class).hasMessageContaining("externalId");
    }

    @Test
    void testUpdateSuccess() {

        // given
        var account = Account.builder()
                .officialName("officialName")
                .name("name")
                .type(AccountType.ENUM_UNKNOWN)
                .subtype(AccountSubtype.ENUM_UNKNOWN)
                .id(1)
                .build();

        // when
        underTest.update(account);

        // then
        var capture = ArgumentCaptor.forClass(Account.class);
        verify(accountRepository).save(capture.capture());
        assertThat(capture.getValue()).isEqualTo(account);
    }

    @Test
    void testUpdateFailIdIsNull() {

        // given
        var account = Account.builder()
                .officialName("officialName")
                .name("name")
                .type(AccountType.ENUM_UNKNOWN)
                .subtype(AccountSubtype.ENUM_UNKNOWN)
                .build();

        // when
        ThrowingCallable actual = () -> underTest.update(account);

        // then
        assertThatThrownBy(actual).isInstanceOf(InvalidParameterException.class).hasMessageContaining("id");

        verify(accountRepository, never()).save(any(Account.class));
    }

    @Test
    void testUpdateFailAccountIsNull() {

        // when
        ThrowingCallable actual = () -> underTest.update(null);

        // then
        assertThatThrownBy(actual).isInstanceOf(NullPointerException.class).hasMessageContaining("account");
    }
}
