package com.camerondix.carteira.data.external;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.assertj.core.api.AssertionsForClassTypes.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.io.IOException;
import java.time.Clock;
import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.List;

import org.assertj.core.api.ThrowableAssert.ThrowingCallable;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.camerondix.carteira.model.TransactionUpdate;
import com.camerondix.carteira.model.entity.Account;
import com.camerondix.carteira.model.entity.Apr;
import com.camerondix.carteira.model.entity.AprType;
import com.camerondix.carteira.model.entity.Balance;
import com.camerondix.carteira.model.entity.Category;
import com.camerondix.carteira.model.entity.CreditInfo;
import com.camerondix.carteira.model.entity.DepositoryInfo;
import com.camerondix.carteira.model.entity.PlaidItem;
import com.plaid.client.model.APR;
import com.plaid.client.model.APR.AprTypeEnum;
import com.plaid.client.model.AccountBalance;
import com.plaid.client.model.AccountBase;
import com.plaid.client.model.AccountSubtype;
import com.plaid.client.model.AccountType;
import com.plaid.client.model.AccountsBalanceGetRequest;
import com.plaid.client.model.AccountsGetResponse;
import com.plaid.client.model.AuthGetNumbers;
import com.plaid.client.model.AuthGetRequest;
import com.plaid.client.model.AuthGetResponse;
import com.plaid.client.model.CreditCardLiability;
import com.plaid.client.model.Item;
import com.plaid.client.model.ItemGetRequest;
import com.plaid.client.model.ItemGetResponse;
import com.plaid.client.model.LiabilitiesGetRequest;
import com.plaid.client.model.LiabilitiesGetResponse;
import com.plaid.client.model.LiabilitiesObject;
import com.plaid.client.model.Location;
import com.plaid.client.model.NumbersACH;
import com.plaid.client.model.PaymentMeta;
import com.plaid.client.model.PersonalFinanceCategory;
import com.plaid.client.model.Products;
import com.plaid.client.model.RemovedTransaction;
import com.plaid.client.model.Transaction;
import com.plaid.client.model.TransactionsSyncRequest;
import com.plaid.client.model.TransactionsSyncRequestOptions;
import com.plaid.client.model.TransactionsSyncResponse;
import com.plaid.client.request.PlaidApi;

import retrofit2.Call;
import retrofit2.Response;

@ExtendWith(MockitoExtension.class)
public class PlaidRepositoryTest {

	private PlaidRepository underTest;

	@Mock
	private PlaidApi plaidClient;

	private Clock clock = Clock.fixed(Instant.now(), ZoneId.systemDefault());

	String accessToken = "accessToken";
	String itemId = "itemId";

	Account account1 = Account.builder()
			.externalId("accountId1")
			.mask("mask")
			.name("name1")
			.officialName("officialName1")
			.type(com.camerondix.carteira.model.entity.AccountType.CASH)
			.subtype(com.camerondix.carteira.model.entity.AccountSubtype.CHECKING)
			.depositoryInfo(DepositoryInfo.builder()
					.accountNumber("accountNumber")
					.routingNumber("routingNumber")
					.build())
			.build();

	Account account2 = Account.builder()
			.externalId("accountId2")
			.name("name2")
			.officialName("name2")
			.type(com.camerondix.carteira.model.entity.AccountType.CREDIT)
			.subtype(com.camerondix.carteira.model.entity.AccountSubtype.ENUM_UNKNOWN)
			.creditInfo(CreditInfo.builder()
					.isOverdue(false)
					.lastPaymentAmount(100f)
					.lastStatementBalance(120f)
					.lastPaymentDate(LocalDate.now(clock))
					.lastStatementDate(LocalDate.now(clock))
					.nextPaymentDueDate(LocalDate.now(clock))
					.minimumPayment(10f)
					.aprs(List.of(
							Apr.builder()
									.balanceSubjectToApr(0f)
									.percentage(23f)
									.type(AprType.CASH_APR)
									.build(),
							Apr.builder()
									.interestChargeAmount(100f)
									.balanceSubjectToApr(200f)
									.percentage(10f)
									.type(AprType.PURCHASE_APR)
									.build()))
					.build())
			.build();

	List<Account> accounts = List.of(account1, account2);

	PlaidItem plaidItem = PlaidItem.builder()
			.plaidId("itemId")
			.accessToken(accessToken)
			.institutionId("institutionId")
			.accounts(accounts)
			.build();

	@BeforeEach
	void setUp() {

		underTest = new PlaidRepository(plaidClient, clock);
	}

	@Test
	void testGetItemForTokenAsync() throws IOException {

		// given
		var billedProducts = List.of(Products.AUTH);
		var availableProducts = List.of(Products.LIABILITIES, Products.INCOME);

		var item = new Item()
				.itemId(itemId)
				.institutionId(plaidItem.getInstitutionId())
				.billedProducts(billedProducts)
				.availableProducts(availableProducts);

		var itemResponse = Response.success(new ItemGetResponse().item(item));
		@SuppressWarnings("unchecked")
		Call<ItemGetResponse> itemCall = mock(Call.class);
		when(itemCall.execute()).thenReturn(itemResponse);
		when(plaidClient.itemGet(any(ItemGetRequest.class))).thenReturn(itemCall);

		var accountBase1 = new AccountBase()
				.accountId(account1.getExternalId())
				.mask(account1.getMask())
				.name(account1.getName())
				.officialName(account1.getOfficialName())
				.type(AccountType.fromValue(account1.getType().getValue()))
				.subtype(AccountSubtype.fromValue(account1.getSubtype().getValue()));

		var auth = new AuthGetNumbers().ach(
				List.of(new NumbersACH()
						.accountId(account1.getExternalId())
						.routing(account1.getDepositoryInfo().getRoutingNumber())
						.account(account1.getDepositoryInfo().getAccountNumber())));

		var accountBase2 = new AccountBase()
				.accountId(account2.getExternalId())
				.name(account2.getName())
				.type(AccountType.fromValue(account2.getType().getValue()));

		var liabilities = new LiabilitiesObject().credit(List.of(
				new CreditCardLiability()
						.accountId(account2.getExternalId())
						.isOverdue(account2.getCreditInfo().getIsOverdue())
						.lastPaymentAmount(account2.getCreditInfo().getLastPaymentAmount().doubleValue())
						.lastStatementBalance(account2.getCreditInfo().getLastStatementBalance().doubleValue())
						.lastPaymentDate(account2.getCreditInfo().getLastPaymentDate())
						.lastStatementIssueDate(account2.getCreditInfo().getLastStatementDate())
						.nextPaymentDueDate(account2.getCreditInfo().getNextPaymentDueDate())
						.minimumPaymentAmount(account2.getCreditInfo().getMinimumPayment().doubleValue())
						.aprs(List.of(
								new APR()
										.balanceSubjectToApr(account2.getCreditInfo().getAprs().get(0)
												.getBalanceSubjectToApr().doubleValue())
										.aprPercentage(
												((Float) account2.getCreditInfo().getAprs().get(0).getPercentage())
														.doubleValue())
										.aprType(AprTypeEnum.fromValue(
												account2.getCreditInfo().getAprs().get(0).getType().getValue())),
								new APR()
										.interestChargeAmount(account2.getCreditInfo().getAprs().get(1)
												.getInterestChargeAmount().doubleValue())
										.balanceSubjectToApr(account2.getCreditInfo().getAprs().get(1)
												.getBalanceSubjectToApr().doubleValue())
										.aprPercentage(
												((Float) account2.getCreditInfo().getAprs().get(1).getPercentage())
														.doubleValue())
										.aprType(AprTypeEnum.fromValue(
												account2.getCreditInfo().getAprs().get(1).getType().getValue()))))));

		var accountBases = List.of(accountBase1, accountBase2);

		var authResponse = Response.success(new AuthGetResponse()
				.numbers(auth)
				.accounts(accountBases));
		@SuppressWarnings("unchecked")
		Call<AuthGetResponse> authCall = mock(Call.class);
		when(authCall.execute()).thenReturn(authResponse);
		when(plaidClient.authGet(any(AuthGetRequest.class))).thenReturn(authCall);

		var liabilityResponse = Response.success(new LiabilitiesGetResponse()
				.liabilities(liabilities)
				.accounts(accountBases));
		@SuppressWarnings("unchecked")
		Call<LiabilitiesGetResponse> liabilityCall = mock(Call.class);
		when(liabilityCall.execute()).thenReturn(liabilityResponse);
		when(plaidClient.liabilitiesGet(any(LiabilitiesGetRequest.class))).thenReturn(liabilityCall);

		var expected = plaidItem;

		// when
		var actual = underTest.retrieveItemForToken(accessToken);

		// then
		var itemRequestCapture = ArgumentCaptor.forClass(ItemGetRequest.class);
		verify(plaidClient).itemGet(itemRequestCapture.capture());
		assertThat(itemRequestCapture.getValue()).hasFieldOrPropertyWithValue("accessToken", accessToken);

		var authRequestCapture = ArgumentCaptor.forClass(AuthGetRequest.class);
		verify(plaidClient).authGet(authRequestCapture.capture());
		assertThat(itemRequestCapture.getValue()).hasFieldOrPropertyWithValue("accessToken", accessToken);

		var liabilitiesRequestCapture = ArgumentCaptor.forClass(LiabilitiesGetRequest.class);
		verify(plaidClient).liabilitiesGet(liabilitiesRequestCapture.capture());
		assertThat(itemRequestCapture.getValue()).hasFieldOrPropertyWithValue("accessToken", accessToken);

		assertThat(actual).usingRecursiveComparison().isEqualTo(expected);
	}

	@Test
	void testGetItemForTokenAsyncIOException() throws IOException {

		// given
		@SuppressWarnings("unchecked")
		Call<ItemGetResponse> itemCall = mock(Call.class);
		when(itemCall.execute()).thenThrow(new IOException());
		when(plaidClient.itemGet(any(ItemGetRequest.class))).thenReturn(itemCall);

		// when
		var actual = underTest.retrieveItemForToken(accessToken);

		// then
		assertThat(actual).isNull();
	}

	@Test
	void testGetItemForTokenAsyncTokenIsNull() {

		// when
		ThrowingCallable actual = () -> underTest.retrieveItemForToken(null);

		// then
		assertThatThrownBy(actual).isInstanceOf(NullPointerException.class).hasMessageStartingWith("token");
	}

	@Test
	void testGetBalancesForItemAsync() throws IOException {

		// given
		Balance balance1 = Balance.builder()
				.available(1.0f)
				.current(2.0f)
				.account(account1)
				.timestamp(LocalDateTime.now(clock))
				.build();

		Balance balance2 = Balance.builder()
				.available(3.0f)
				.current(4.0f)
				.limit(5.0f)
				.account(account2)
				.timestamp(LocalDateTime.now(clock))
				.build();

		account1.setCurrentBalance(balance1);
		account2.setCurrentBalance(balance2);

		var accountBalances1 = new AccountBalance()
				.available(balance1.getAvailable().doubleValue())
				.current(balance1.getCurrent().doubleValue());

		var accountBase1 = new AccountBase()
				.accountId(account1.getExternalId())
				.balances(accountBalances1);

		var accountBalances2 = new AccountBalance()
				.available(balance2.getAvailable().doubleValue())
				.current(balance2.getCurrent().doubleValue())
				.limit(balance2.getLimit().doubleValue());

		var accountBase2 = new AccountBase()
				.accountId(account2.getExternalId())
				.balances(accountBalances2);

		var accountBases = List.of(accountBase1, accountBase2);
		var response = Response.success(new AccountsGetResponse().accounts(accountBases));
		@SuppressWarnings("unchecked")
		Call<AccountsGetResponse> call = mock(Call.class);
		when(call.execute()).thenReturn(response);
		when(plaidClient.accountsBalanceGet(any(AccountsBalanceGetRequest.class))).thenReturn(call);

		var expected = List.of(balance1, balance2);

		// when
		var actual = underTest.retrieveBalancesForItem(plaidItem);

		// then
		var requestCapture = ArgumentCaptor.forClass(AccountsBalanceGetRequest.class);
		verify(plaidClient).accountsBalanceGet(requestCapture.capture());
		assertThat(requestCapture.getValue()).hasFieldOrPropertyWithValue("accessToken", accessToken);

		assertThat(actual).usingRecursiveComparison().isEqualTo(expected);
	}

	@Test
	void testGetBalancesForItemAsyncIOException() throws IOException {

		// given
		@SuppressWarnings("unchecked")
		Call<AccountsGetResponse> call = mock(Call.class);
		when(call.execute()).thenThrow(new IOException());
		when(plaidClient.accountsBalanceGet(any(AccountsBalanceGetRequest.class))).thenReturn(call);

		// when
		var actual = underTest.retrieveBalancesForItem(plaidItem);

		// then
		assertThat(actual).isNull();
	}

	@Test
	void testGetBalancesForItemAsyncPlaidItemIsNull() {

		// when
		ThrowingCallable actual = () -> underTest.retrieveBalancesForItem(null);

		// then
		assertThatThrownBy(actual).isInstanceOf(NullPointerException.class).hasMessageStartingWith("plaidItem");
	}

	@Test
	void testGetTransactionSyncAsync() throws IOException {

		// given
		plaidItem.setTransactionCursor("transactionCursor");

		var add1 = com.camerondix.carteira.model.entity.Transaction.builder()
				.account(account2)
				.externalId("transaction1")
				.name("addTransaction1")
				.timestamp(LocalDateTime.now(clock))
				.amount(10)
				.category(Category.builder()
						.name("Fast Food")
						.build())
				.build();

		var add2 = com.camerondix.carteira.model.entity.Transaction.builder()
				.account(account1)
				.externalId("transaction2")
				.name("addTransaction2")
				.timestamp(LocalDateTime.now(clock))
				.amount(50)
				.category(Category.builder()
						.name("Internet and Cable")
						.build())
				.build();

		var modify1 = com.camerondix.carteira.model.entity.Transaction.builder()
				.account(account1)
				.externalId("transaction3")
				.name("modifyTransaction1")
				.timestamp(LocalDateTime.now(clock))
				.amount(20)
				.category(Category.builder()
						.name("Hardware")
						.build())
				.build();

		var modify2 = com.camerondix.carteira.model.entity.Transaction.builder()
				.account(account2)
				.externalId("transaction4")
				.name("modifyTransaction2")
				.timestamp(LocalDateTime.now(clock))
				.amount(70)
				.category(Category.builder()
						.name("Electronics")
						.build())
				.build();

		var remove1 = "transaction5";
		var remove2 = "transaction6";

		var added = List.of(
				new Transaction()
						.accountId(add1.getAccount().getExternalId())
						.transactionId(add1.getExternalId())
						.name(add1.getName())
						.datetime(add1.getTimestamp().atZone(clock.getZone()).toOffsetDateTime())
						.amount(((Float) add1.getAmount()).doubleValue())
						.personalFinanceCategory(new PersonalFinanceCategory().detailed("FOOD_AND_DRINK_FAST_FOOD"))
						.location(new Location())
						.paymentMeta(new PaymentMeta()),
				new Transaction()
						.accountId(add2.getAccount().getExternalId())
						.transactionId(add2.getExternalId())
						.name(add2.getName())
						.datetime(add2.getTimestamp().atZone(clock.getZone()).toOffsetDateTime())
						.amount(((Float) add2.getAmount()).doubleValue())
						.personalFinanceCategory(
								new PersonalFinanceCategory().detailed("RENT_AND_UTILITIES_INTERNET_AND_CABLE"))
						.location(new Location())
						.paymentMeta(new PaymentMeta()));

		var modified = List.of(
				new Transaction()
						.accountId(modify1.getAccount().getExternalId())
						.transactionId(modify1.getExternalId())
						.name(modify1.getName())
						.datetime(modify1.getTimestamp().atZone(clock.getZone()).toOffsetDateTime())
						.amount(((Float) modify1.getAmount()).doubleValue())
						.personalFinanceCategory(new PersonalFinanceCategory().detailed("HOME_IMPROVEMENT_HARDWARE"))
						.location(new Location())
						.paymentMeta(new PaymentMeta()),
				new Transaction()
						.accountId(modify2.getAccount().getExternalId())
						.transactionId(modify2.getExternalId())
						.name(modify2.getName())
						.datetime(modify2.getTimestamp().atZone(clock.getZone()).toOffsetDateTime())
						.amount(((Float) modify2.getAmount()).doubleValue())
						.personalFinanceCategory(
								new PersonalFinanceCategory().detailed("GENERAL_MERCHANDISE_ELECTRONICS"))
						.location(new Location())
						.paymentMeta(new PaymentMeta()));

		var removed = List.of(
				new RemovedTransaction().transactionId(remove1),
				new RemovedTransaction().transactionId(remove2));

		var response = Response.success(new TransactionsSyncResponse()
				.added(added)
				.modified(modified)
				.removed(removed)
				.nextCursor(plaidItem.getTransactionCursor())
				.hasMore(false));

		@SuppressWarnings("unchecked")
		Call<TransactionsSyncResponse> call = mock(Call.class);
		when(call.execute()).thenReturn(response);
		when(plaidClient.transactionsSync(any(TransactionsSyncRequest.class))).thenReturn(call);

		var expected = TransactionUpdate.builder()
				.token(plaidItem.getAccessToken())
				.cursor(plaidItem.getTransactionCursor())
				.added(List.of(add1, add2))
				.modified(List.of(modify1, modify2))
				.removed(List.of(remove1, remove2))
				.build();

		// when
		var actual = underTest.retrieveTransactionSync(plaidItem);

		// then
		var requestCapture = ArgumentCaptor.forClass(TransactionsSyncRequest.class);
		verify(plaidClient).transactionsSync(requestCapture.capture());
		assertThat(requestCapture.getValue())
				.hasFieldOrPropertyWithValue("accessToken", accessToken)
				.hasFieldOrPropertyWithValue("cursor", plaidItem.getTransactionCursor())
				.hasFieldOrPropertyWithValue("options",
						new TransactionsSyncRequestOptions().includePersonalFinanceCategory(true));

		assertThat(actual).usingRecursiveComparison().isEqualTo(expected);
	}

	@Test
	void testGetTransactionSyncAsyncIOException() throws IOException {

		// given
		@SuppressWarnings("unchecked")
		Call<TransactionsSyncResponse> call = mock(Call.class);
		when(call.execute()).thenThrow(new IOException());
		when(plaidClient.transactionsSync(any(TransactionsSyncRequest.class))).thenReturn(call);

		// when
		var actual = underTest.retrieveTransactionSync(plaidItem);

		// then
		assertThat(actual).isNull();
	}

	@Test
	void testGetTransactionSyncAsyncPlaidItemIsNull() {

		// when
		ThrowingCallable actual = () -> underTest.retrieveTransactionSync(null);

		// then
		assertThatThrownBy(actual).isInstanceOf(NullPointerException.class).hasMessageStartingWith("plaidItem");
	}
}
