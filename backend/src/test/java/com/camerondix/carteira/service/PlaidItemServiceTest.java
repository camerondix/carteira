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
import java.util.Optional;

import org.assertj.core.api.ThrowableAssert.ThrowingCallable;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.camerondix.carteira.data.PlaidItemRepository;
import com.camerondix.carteira.model.entity.Account;
import com.camerondix.carteira.model.entity.PlaidItem;

@ExtendWith(MockitoExtension.class)
public class PlaidItemServiceTest {

    private PlaidItemService underTest;

    @Mock
    private PlaidItemRepository plaidItemRepository;

    @BeforeEach
    void setUp() {

        underTest = new PlaidItemService(plaidItemRepository);
    }

    @Test
    void testCreateSuccess() {

        // given
        var plaidItem = PlaidItem.builder()
                .plaidId("plaidId")
                .accessToken("accessToken")
                .build();

        // when
        underTest.create(plaidItem);

        // then
        var capture = ArgumentCaptor.forClass(PlaidItem.class);
        verify(plaidItemRepository).save(capture.capture());
        assertThat(capture.getValue()).isEqualTo(plaidItem);
    }

    @Test
    void testCreateFailPlaidItemIsNull() {

        // when
        ThrowingCallable actual = () -> underTest.create(null);

        // then
        assertThatThrownBy(actual).isInstanceOf(NullPointerException.class).hasMessageContaining("plaidItem");
    }

    @Test
    void testRetrieveByPlaidIdSuccess() {

        // given
        var plaidId = "plaidId";

        when(plaidItemRepository.findByPlaidId(anyString())).thenReturn(Optional.of(mock(PlaidItem.class)));

        // when
        underTest.retrieveByPlaidId(plaidId);

        // then
        var capture = ArgumentCaptor.forClass(String.class);
        verify(plaidItemRepository).findByPlaidId(capture.capture());
        assertThat(capture.getValue()).isEqualTo(plaidId);
    }

    @Test
    void testRetrieveReferenceByExternalIdFailNotFound() {

        // given
        var plaidId = "plaidId";

        when(plaidItemRepository.findByPlaidId(anyString())).thenReturn(Optional.ofNullable(null));

        // when
        ThrowingCallable actual = () -> underTest.retrieveByPlaidId(plaidId);

        // then
        assertThatThrownBy(actual).isInstanceOf(NoSuchElementException.class);
    }

    @Test
    void testRetrieveByPlaidIdFailPlaidIdIsNull() {

        // when
        ThrowingCallable actual = () -> underTest.retrieveByPlaidId(null);

        // then
        assertThatThrownBy(actual).isInstanceOf(NullPointerException.class).hasMessageContaining("plaidId");
    }

    @Test
    void testRetrieveByPlaidIdAndLoadAccountsSuccess() {

        // given
        var plaidId = "plaidId";
        var account1 = mock(Account.class);
        var account2 = mock(Account.class);

        var item = mock(PlaidItem.class);
        when(item.getAccounts()).thenReturn(List.of(account1, account2));
        when(plaidItemRepository.findByPlaidId(anyString())).thenReturn(Optional.of(item));

        // when
        underTest.retrieveByPlaidIdAndLoadAccountsThenCurrentBalance(plaidId);

        // then
        verify(account1).getCurrentBalance();
        verify(account2).getCurrentBalance();
    }

    @Test
    void testRetrieveByPlaidIdAndLoadAccountsFailNotFound() {

        // given
        var plaidId = "plaidId";

        when(plaidItemRepository.findByPlaidId(anyString())).thenReturn(Optional.ofNullable(null));

        // when
        ThrowingCallable actual = () -> underTest.retrieveByPlaidIdAndLoadAccounts(plaidId);

        // then
        assertThatThrownBy(actual).isInstanceOf(NoSuchElementException.class);
    }

    @Test
    void testRetrieveByPlaidIdAndLoadAccountsFailPlaidIdIsNull() {

        // when
        ThrowingCallable actual = () -> underTest.retrieveByPlaidIdAndLoadAccounts(null);

        // then
        assertThatThrownBy(actual).isInstanceOf(NullPointerException.class).hasMessageContaining("plaidId");
    }

    @Test
    void testRetrieveByPlaidIdAndLoadAccountsThenCurrentBalanceSuccess() {

        // given
        var plaidId = "plaidId";
        var account1 = mock(Account.class);
        var account2 = mock(Account.class);

        var item = mock(PlaidItem.class);
        when(item.getAccounts()).thenReturn(List.of(account1, account2));
        when(plaidItemRepository.findByPlaidId(anyString())).thenReturn(Optional.of(item));

        // when
        underTest.retrieveByPlaidIdAndLoadAccounts(plaidId);

        // then
        verify(account1).getName();
        verify(account2).getName();
    }

    @Test
    void testRetrieveByPlaidIdAndLoadAccountsThenCurrentBalanceFailNotFound() {

        // given
        var plaidId = "plaidId";

        when(plaidItemRepository.findByPlaidId(anyString())).thenReturn(Optional.ofNullable(null));

        // when
        ThrowingCallable actual = () -> underTest.retrieveByPlaidIdAndLoadAccountsThenCurrentBalance(plaidId);

        // then
        assertThatThrownBy(actual).isInstanceOf(NoSuchElementException.class);
    }

    @Test
    void testRetrieveByPlaidIdAndLoadAccountsThenCurrentBalanceFailPlaidIdIsNull() {

        // when
        ThrowingCallable actual = () -> underTest.retrieveByPlaidIdAndLoadAccountsThenCurrentBalance(null);

        // then
        assertThatThrownBy(actual).isInstanceOf(NullPointerException.class).hasMessageContaining("plaidId");
    }

    @Test
    void testUpdateSuccess() {

        // given
        var plaidItem = PlaidItem.builder()
                .id(1)
                .plaidId("plaidId")
                .accessToken("accessToken")
                .build();

        // when
        underTest.create(plaidItem);

        // then
        var capture = ArgumentCaptor.forClass(PlaidItem.class);
        verify(plaidItemRepository).save(capture.capture());
        assertThat(capture.getValue()).isEqualTo(plaidItem);
    }

    @Test
    void testUpdateFailIdIsNull() {

        // given
        var plaidItem = PlaidItem.builder()
                .plaidId("plaidId")
                .accessToken("accessToken")
                .build();

        // when
        ThrowingCallable actual = () -> underTest.update(plaidItem);

        // then
        assertThatThrownBy(actual).isInstanceOf(InvalidParameterException.class).hasMessageContaining("id");

        verify(plaidItemRepository, never()).save(any(PlaidItem.class));
    }

    @Test
    void testUpdateFailPlaidItemIsNull() {

        // when
        ThrowingCallable actual = () -> underTest.update(null);

        // then
        assertThatThrownBy(actual).isInstanceOf(NullPointerException.class).hasMessageContaining("plaidItem");
    }
}
