package com.camerondix.carteira.data.external;

import java.io.IOException;
import java.time.Clock;
import java.time.LocalDateTime;
import java.util.AbstractMap;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.camerondix.carteira.exception.PlaidApiException;
import com.camerondix.carteira.model.TransactionUpdate;
import com.camerondix.carteira.model.entity.Account;
import com.camerondix.carteira.model.entity.AccountSubtype;
import com.camerondix.carteira.model.entity.AccountType;
import com.camerondix.carteira.model.entity.Apr;
import com.camerondix.carteira.model.entity.AprType;
import com.camerondix.carteira.model.entity.Balance;
import com.camerondix.carteira.model.entity.Category;
import com.camerondix.carteira.model.entity.CreditInfo;
import com.camerondix.carteira.model.entity.DepositoryInfo;
import com.camerondix.carteira.model.entity.Location;
import com.camerondix.carteira.model.entity.PaymentMeta;
import com.camerondix.carteira.model.entity.PlaidItem;
import com.camerondix.carteira.model.entity.Transaction;
import com.camerondix.carteira.service.CategoryService;
import com.plaid.client.model.APR;
import com.plaid.client.model.AccountBalance;
import com.plaid.client.model.AccountBase;
import com.plaid.client.model.AccountsBalanceGetRequest;
import com.plaid.client.model.AuthGetRequest;
import com.plaid.client.model.CreditCardLiability;
import com.plaid.client.model.Item;
import com.plaid.client.model.ItemGetRequest;
import com.plaid.client.model.LiabilitiesGetRequest;
import com.plaid.client.model.NumbersACH;
import com.plaid.client.model.Products;
import com.plaid.client.model.RemovedTransaction;
import com.plaid.client.model.TransactionsSyncRequest;
import com.plaid.client.model.TransactionsSyncRequestOptions;
import com.plaid.client.request.PlaidApi;

import lombok.NonNull;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Repository
public class PlaidRepository {

	// #region CATEGORY_MAP
	//@formatter:off
    private static final Map<String, String> CATEGORY_MAP = Map.ofEntries(
            new AbstractMap.SimpleEntry<String, String>("INCOME_DIVIDENDS", "Dividends"),
            new AbstractMap.SimpleEntry<String, String>("INCOME_INTEREST_EARNED", "Interest Earned"),
            new AbstractMap.SimpleEntry<String, String>("INCOME_RETIREMENT_PENSION", "Retirement Pension"),
            new AbstractMap.SimpleEntry<String, String>("INCOME_TAX_REFUND", "Tax Refund"),
            new AbstractMap.SimpleEntry<String, String>("INCOME_UNEMPLOYMENT", "Unemployment"),
            new AbstractMap.SimpleEntry<String, String>("INCOME_WAGES", "Wages"),
            new AbstractMap.SimpleEntry<String, String>("INCOME_OTHER_INCOME", "Other Income"),
            new AbstractMap.SimpleEntry<String, String>("TRANSFER_IN_CASH_ADVANCES_AND_LOANS","Cash Advances and Loans"),
            new AbstractMap.SimpleEntry<String, String>("TRANSFER_IN_DEPOSIT", "Deposit"),
            new AbstractMap.SimpleEntry<String, String>("TRANSFER_IN_INVESTMENT_AND_RETIREMENT_FUNDS", "From Investment and Retirement Funds"),
            new AbstractMap.SimpleEntry<String, String>("TRANSFER_IN_SAVINGS", "From Savings"),
            new AbstractMap.SimpleEntry<String, String>("TRANSFER_IN_ACCOUNT_TRANSFER", "From Account"),
            new AbstractMap.SimpleEntry<String, String>("TRANSFER_IN_OTHER_TRANSFER_IN", "Other Transfer In"),
            new AbstractMap.SimpleEntry<String, String>("TRANSFER_OUT_INVESTMENT_AND_RETIREMENT_FUNDS", "To Investment and Retirement Funds"),
            new AbstractMap.SimpleEntry<String, String>("TRANSFER_OUT_SAVINGS", "To Savings"),
            new AbstractMap.SimpleEntry<String, String>("TRANSFER_OUT_WITHDRAWAL", "Withdrawl"),
            new AbstractMap.SimpleEntry<String, String>("TRANSFER_OUT_ACCOUNT_TRANSFER", "To Account"),
            new AbstractMap.SimpleEntry<String, String>("TRANSFER_OUT_OTHER_TRANSFER_OUT", "Other Transfer Out"),
            new AbstractMap.SimpleEntry<String, String>("LOAN_PAYMENTS_CAR_PAYMENT", "Car Payment"),
            new AbstractMap.SimpleEntry<String, String>("LOAN_PAYMENTS_CREDIT_CARD_PAYMENT", "Credit Card Payment"),
            new AbstractMap.SimpleEntry<String, String>("LOAN_PAYMENTS_PERSONAL_LOAN_PAYMENT", "Personal Loan Payment"),
            new AbstractMap.SimpleEntry<String, String>("LOAN_PAYMENTS_MORTGAGE_PAYMENT", "Mortgage Payment"),
            new AbstractMap.SimpleEntry<String, String>("LOAN_PAYMENTS_STUDENT_LOAN_PAYMENT", "Student Loan Payment"),
            new AbstractMap.SimpleEntry<String, String>("LOAN_PAYMENTS_OTHER_PAYMENT", "Other Loan Payments"),
            new AbstractMap.SimpleEntry<String, String>("BANK_FEES_ATM_FEES", "ATM Fees"),
            new AbstractMap.SimpleEntry<String, String>("BANK_FEES_FOREIGN_TRANSACTION_FEES", "Foreign Transaction Fees"),
            new AbstractMap.SimpleEntry<String, String>("BANK_FEES_INSUFFICIENT_FUNDS", "Insufficient Funds"),
            new AbstractMap.SimpleEntry<String, String>("BANK_FEES_INTEREST_CHARGE", "Interest Charge"),
            new AbstractMap.SimpleEntry<String, String>("BANK_FEES_OVERDRAFT_FEES", "Overdraft Fees"),
            new AbstractMap.SimpleEntry<String, String>("BANK_FEES_OTHER_BANK_FEES", "Other Bank Fees"),
            new AbstractMap.SimpleEntry<String, String>("ENTERTAINMENT_CASINOS_AND_GAMBLING", "Casinos and Gambling"),
            new AbstractMap.SimpleEntry<String, String>("ENTERTAINMENT_MUSIC_AND_AUDIO", "Music and Audio"),
            new AbstractMap.SimpleEntry<String, String>("ENTERTAINMENT_SPORTING_EVENTS_AMUSEMENT_PARKS_AND_MUSEUMS", "Events"),
            new AbstractMap.SimpleEntry<String, String>("ENTERTAINMENT_TV_AND_MOVIES", "TV and Movies"),
            new AbstractMap.SimpleEntry<String, String>("ENTERTAINMENT_VIDEO_GAMES", "Video Games"),
            new AbstractMap.SimpleEntry<String, String>("ENTERTAINMENT_OTHER_ENTERTAINMENT", "Other Entertainment"),
            new AbstractMap.SimpleEntry<String, String>("FOOD_AND_DRINK_BEER_WINE_AND_LIQUOR", "Alcohol"),
            new AbstractMap.SimpleEntry<String, String>("FOOD_AND_DRINK_COFFEE", "Coffee"),
            new AbstractMap.SimpleEntry<String, String>("FOOD_AND_DRINK_FAST_FOOD", "Fast Food"),
            new AbstractMap.SimpleEntry<String, String>("FOOD_AND_DRINK_GROCERIES", "Groceries"),
            new AbstractMap.SimpleEntry<String, String>("FOOD_AND_DRINK_RESTAURANT", "Restaurant"),
            new AbstractMap.SimpleEntry<String, String>("FOOD_AND_DRINK_VENDING_MACHINES", "Vending Machines"),
            new AbstractMap.SimpleEntry<String, String>("FOOD_AND_DRINK_OTHER_FOOD_AND_DRINK", "Other Food and Drink"),
            new AbstractMap.SimpleEntry<String, String>("GENERAL_MERCHANDISE_BOOKSTORES_AND_NEWSSTANDS", "Bookstores and Newsstands"),
            new AbstractMap.SimpleEntry<String, String>("GENERAL_MERCHANDISE_CLOTHING_AND_ACCESSORIES", "Clothing and Accessories"),
            new AbstractMap.SimpleEntry<String, String>("GENERAL_MERCHANDISE_CONVENIENCE_STORES", "Convenience Stores"),
            new AbstractMap.SimpleEntry<String, String>("GENERAL_MERCHANDISE_DEPARTMENT_STORES", "Department Stores"),
            new AbstractMap.SimpleEntry<String, String>("GENERAL_MERCHANDISE_DISCOUNT_STORES", "Discount Stores"),
            new AbstractMap.SimpleEntry<String, String>("GENERAL_MERCHANDISE_ELECTRONICS", "Electronics"),
            new AbstractMap.SimpleEntry<String, String>("GENERAL_MERCHANDISE_GIFTS_AND_NOVELTIES", "Gifts and Novelties"),
            new AbstractMap.SimpleEntry<String, String>("GENERAL_MERCHANDISE_OFFICE_SUPPLIES", "Office Supplies"),
            new AbstractMap.SimpleEntry<String, String>("GENERAL_MERCHANDISE_ONLINE_MARKETPLACES", "Online Marketplaces"),
            new AbstractMap.SimpleEntry<String, String>("GENERAL_MERCHANDISE_PET_SUPPLIES", "Pet Supplies"),
            new AbstractMap.SimpleEntry<String, String>("GENERAL_MERCHANDISE_SPORTING_GOODS", "Sporting Goods"),
            new AbstractMap.SimpleEntry<String, String>("GENERAL_MERCHANDISE_SUPERSTORES", "Superstores"),
            new AbstractMap.SimpleEntry<String, String>("GENERAL_MERCHANDISE_TOBACCO_AND_VAPE", "Tobacco and Vape"),
            new AbstractMap.SimpleEntry<String, String>("GENERAL_MERCHANDISE_OTHER_GENERAL_MERCHANDISE", "Other General Merchandise"),
            new AbstractMap.SimpleEntry<String, String>("HOME_IMPROVEMENT_FURNITURE", "Furniture"),
            new AbstractMap.SimpleEntry<String, String>("HOME_IMPROVEMENT_HARDWARE", "Hardware"),
            new AbstractMap.SimpleEntry<String, String>("HOME_IMPROVEMENT_REPAIR_AND_MAINTENANCE", "Repair and Maintenance"),
            new AbstractMap.SimpleEntry<String, String>("HOME_IMPROVEMENT_SECURITY", "Security"),
            new AbstractMap.SimpleEntry<String, String>("HOME_IMPROVEMENT_OTHER_HOME_IMPROVEMENT", "Other Home Improvement"),
            new AbstractMap.SimpleEntry<String, String>("MEDICAL_DENTAL_CARE", "Dental Care"),
            new AbstractMap.SimpleEntry<String, String>("MEDICAL_EYE_CARE", "Eye Care"),
            new AbstractMap.SimpleEntry<String, String>("MEDICAL_NURSING_CARE", "Nursing Care"),
            new AbstractMap.SimpleEntry<String, String>("MEDICAL_PHARMACIES_AND_SUPPLEMENTS", "Pharmacies and Supplements"),
            new AbstractMap.SimpleEntry<String, String>("MEDICAL_PRIMARY_CARE", "Primary Care"),
            new AbstractMap.SimpleEntry<String, String>("MEDICAL_VETERINARY_SERVICES", "Veterinary Services"),
            new AbstractMap.SimpleEntry<String, String>("MEDICAL_OTHER_MEDICAL", "Other Medical"),
            new AbstractMap.SimpleEntry<String, String>("PERSONAL_CARE_GYMS_AND_FITNESS_CENTERS", "Gyms and Fitness Centers"),
            new AbstractMap.SimpleEntry<String, String>("PERSONAL_CARE_HAIR_AND_BEAUTY", "Hair and Beauty"),
            new AbstractMap.SimpleEntry<String, String>("PERSONAL_CARE_LAUNDRY_AND_DRY_CLEANING", "Laundry and Dry Cleaning"),
            new AbstractMap.SimpleEntry<String, String>("PERSONAL_CARE_OTHER_PERSONAL_CARE", "Other Personal Care"),
            new AbstractMap.SimpleEntry<String, String>("GENERAL_SERVICES_ACCOUNTING_AND_FINANCIAL_PLANNING", "Accounting and Financial Planning"),
            new AbstractMap.SimpleEntry<String, String>("GENERAL_SERVICES_AUTOMOTIVE", "Automotive"),
            new AbstractMap.SimpleEntry<String, String>("GENERAL_SERVICES_CHILDCARE", "Childcare"),
            new AbstractMap.SimpleEntry<String, String>("GENERAL_SERVICES_CONSULTING_AND_LEGAL", "Consulting and Legal"),
            new AbstractMap.SimpleEntry<String, String>("GENERAL_SERVICES_EDUCATION", "Education"),
            new AbstractMap.SimpleEntry<String, String>("GENERAL_SERVICES_INSURANCE", "Insurance"),
            new AbstractMap.SimpleEntry<String, String>("GENERAL_SERVICES_POSTAGE_AND_SHIPPING", "Postage and Shipping"),
            new AbstractMap.SimpleEntry<String, String>("GENERAL_SERVICES_STORAGE", "Storage"),
            new AbstractMap.SimpleEntry<String, String>("GENERAL_SERVICES_OTHER_GENERAL_SERVICES", "Other General Services"),
            new AbstractMap.SimpleEntry<String, String>("GOVERNMENT_AND_NON_PROFIT_DONATIONS", "Donations"),
            new AbstractMap.SimpleEntry<String, String>("GOVERNMENT_AND_NON_PROFIT_GOVERNMENT_DEPARTMENTS_AND_AGENCIES", "Government Departments and Agencies"),
            new AbstractMap.SimpleEntry<String, String>("GOVERNMENT_AND_NON_PROFIT_TAX_PAYMENT", "Tax Payment"),
            new AbstractMap.SimpleEntry<String, String>("GOVERNMENT_AND_NON_PROFIT_OTHER_GOVERNMENT_AND_NON_PROFIT", "Other Government and Nonprofit"),
            new AbstractMap.SimpleEntry<String, String>("TRANSPORTATION_BIKES_AND_SCOOTERS", "Bikes and Scooters"),
            new AbstractMap.SimpleEntry<String, String>("TRANSPORTATION_GAS", "Gas"),
            new AbstractMap.SimpleEntry<String, String>("TRANSPORTATION_PARKING", "Parking"),
            new AbstractMap.SimpleEntry<String, String>("TRANSPORTATION_PUBLIC_TRANSIT", "Public Transit"),
            new AbstractMap.SimpleEntry<String, String>("TRANSPORTATION_TAXIS_AND_RIDE_SHARES", "Ride Shares"),
            new AbstractMap.SimpleEntry<String, String>("TRANSPORTATION_TOLLS", "Tolls"),
            new AbstractMap.SimpleEntry<String, String>("TRANSPORTATION_OTHER_TRANSPORTATION", "Other Transportation"),
            new AbstractMap.SimpleEntry<String, String>("TRAVEL_FLIGHTS", "Flights"),
            new AbstractMap.SimpleEntry<String, String>("TRAVEL_LODGING", "Lodging"),
            new AbstractMap.SimpleEntry<String, String>("TRAVEL_RENTAL_CARS", "Rental Cars"),
            new AbstractMap.SimpleEntry<String, String>("TRAVEL_OTHER_TRAVEL", "Other Travel"),
            new AbstractMap.SimpleEntry<String, String>("RENT_AND_UTILITIES_GAS_AND_ELECTRICITY", "Gas and Electricity"),
            new AbstractMap.SimpleEntry<String, String>("RENT_AND_UTILITIES_INTERNET_AND_CABLE", "Internet and Cable"),
            new AbstractMap.SimpleEntry<String, String>("RENT_AND_UTILITIES_RENT", "Rent"),
            new AbstractMap.SimpleEntry<String, String>("RENT_AND_UTILITIES_SEWAGE_AND_WASTE_MANAGEMENT", "Sewage and Waste"),
            new AbstractMap.SimpleEntry<String, String>("RENT_AND_UTILITIES_TELEPHONE", "Telephone"),
            new AbstractMap.SimpleEntry<String, String>("RENT_AND_UTILITIES_WATER", "Water"),
            new AbstractMap.SimpleEntry<String, String>("RENT_AND_UTILITIES_OTHER_UTILITIES", "Other Rent and Utilities"));
    //@formatter:on
	// #endregion

	private final PlaidApi plaidApi;

	private final Clock clock;

	@Autowired
	public PlaidRepository(PlaidApi plaidApi, Clock clock) {

		log.debug("Initializing plaid repository");
		this.plaidApi = plaidApi;
		this.clock = clock;
	}

	public PlaidItem retrieveItemForToken(@NonNull String token) {

		try {
			var item = getItem(token);
			var accounts = getAccountsForItem(token, item);
			return PlaidItem.builder()
					.plaidId(item.getItemId())
					.accessToken(token)
					.institutionId(item.getInstitutionId())
					.accounts(accounts).build();
		} catch (IOException e) {
			log.error("IO Exception prevented get item", e);
			return null;
		}
	}

	private Item getItem(String token) throws IOException {

		var request = new ItemGetRequest().accessToken(token);
		log.debug("Sending item get request {}", request);
		var response = plaidApi.itemGet(request).execute();
		log.debug("Received item get response {}", response);
		if (!response.isSuccessful()) {
			throw new PlaidApiException(response.message());
		}
		var body = response.body();
		if (body == null) {
			throw new PlaidApiException("Item get response body was null");
		}
		var item = body.getItem();
		log.debug("Parsed item from body {}", item);
		return item;
	}

	private List<Account> getAccountsForItem(String token, Item item) {

		var products = Stream.concat(item.getBilledProducts().stream(), item.getAvailableProducts().stream()).toList();
		var accounts = new ArrayList<Account>();
		for (Products product : products) {
			switch (product) {
				case AUTH:
					try {
						accounts.addAll(getDepositoryAccountsForToken(token));
					} catch (IOException e) {
						log.error("IO Exception prevented get depository accounts", e);
						return List.of();
					} catch (PlaidApiException e) {
						log.error("Failed to get depository accounts", e);
					}
					break;
				case LIABILITIES:
					try {
						accounts.addAll(getLiabilityAccountsForToken(token));
					} catch (IOException e) {
						log.error("IO Exception prevented get liability accounts", e);
						return List.of();
					} catch (PlaidApiException e) {
						log.error("Failed to get depository accounts", e);
					}
					break;
				default:
					break;
			}
		}

		return filterToMostCompleteAccounts(accounts);
	}

	private List<Account> filterToMostCompleteAccounts(List<Account> allAccounts) {

		var groupedAccounts = allAccounts.stream().collect(Collectors.groupingBy(Account::getExternalId));
		var accounts = new ArrayList<Account>();
		for (List<Account> group : groupedAccounts.values()) {
			var mostFilledAccount = group.stream()
					.filter(a -> !a.getDepositoryInfo().isEmpty()
							|| !a.getCreditInfo().isEmpty())
					.findFirst();
			if (mostFilledAccount.isPresent()) {
				accounts.add(mostFilledAccount.get());
				continue;
			}
			accounts.add(group.get(0));
		}
		return accounts;
	}

	private Account getAccountFromBaseAccount(AccountBase accountBase) {

		var subtype = accountBase.getSubtype();
		return Account.builder()
				.externalId(accountBase.getAccountId())
				.officialName(
						accountBase.getOfficialName() != null ? accountBase.getOfficialName() : accountBase.getName())
				.name(accountBase.getName())
				.type(AccountType.fromValue(accountBase.getType().getValue()))
				.subtype(AccountSubtype.fromValue(subtype == null ? "" : subtype.getValue()))
				.mask(accountBase.getMask()).build();
	}

	private List<Account> getDepositoryAccountsForToken(String token) throws IOException {

		var request = new AuthGetRequest().accessToken(token);
		log.debug("Sending auth get request {}", request);
		var response = plaidApi.authGet(request).execute();
		log.debug("Received auth get response {}", response);
		if (!response.isSuccessful()) {
			throw new PlaidApiException(response.message());
		}
		var body = response.body();
		if (body == null) {
			throw new PlaidApiException("Auth get response body was null");
		}
		var authNumbers = body.getNumbers();
		var accountBases = body.getAccounts();
		var accounts = new ArrayList<Account>();
		for (AccountBase accountBase : accountBases) {
			var account = getAccountFromBaseAccount(accountBase);
			var auth = authNumbers.getAch().stream().filter(a -> accountBase.getAccountId().equals(a.getAccountId()))
					.findFirst();
			if (auth.isPresent()) {
				var depositoryInfo = getDepositoryInfoFromAchNumbers(auth.get());
				account.setDepositoryInfo(depositoryInfo);
			}
			accounts.add(account);
		}
		log.debug("Parsed auth accounts from body {}", accounts);
		return accounts;
	}

	private DepositoryInfo getDepositoryInfoFromAchNumbers(NumbersACH ach) {

		return DepositoryInfo.builder()
				.routingNumber(ach.getRouting())
				.accountNumber(ach.getAccount())
				.build();
	}

	private List<Account> getLiabilityAccountsForToken(String token) throws IOException {

		var request = new LiabilitiesGetRequest().accessToken(token);
		log.debug("Sending liability get request {}", request);
		var response = plaidApi.liabilitiesGet(request).execute();
		log.debug("Received liability get response {}", response);
		if (!response.isSuccessful()) {
			throw new PlaidApiException(response.message());
		}
		var body = response.body();
		if (body == null) {
			throw new PlaidApiException("Liability get response body was null");
		}
		var liabilities = body.getLiabilities();
		var accountBases = body.getAccounts();
		var accounts = new ArrayList<Account>();
		for (AccountBase accountBase : accountBases) {
			var account = getAccountFromBaseAccount(accountBase);
			var creditCardLiabilities = liabilities.getCredit();
			if (creditCardLiabilities != null) {
				var credit = creditCardLiabilities.stream()
						.filter(l -> accountBase.getAccountId().equals(l.getAccountId())).findFirst();
				if (credit.isPresent()) {
					var creditInfo = getCreditInfoFromCreditCardLiability(credit.get());
					account.setCreditInfo(creditInfo);
				}
				accounts.add(account);
			}
		}
		log.debug("Parsed liability accounts from body {}", accounts);
		return accounts;
	}

	private CreditInfo getCreditInfoFromCreditCardLiability(CreditCardLiability credit) {

		var rawAprs = credit.getAprs();
		var aprs = new ArrayList<Apr>(rawAprs.size());
		for (APR apr : rawAprs) {
			Float balanceSubjectToApr = null;
			var balanceSubjectToAprDouble = apr.getBalanceSubjectToApr();
			if (balanceSubjectToAprDouble != null) {
				balanceSubjectToApr = (float) balanceSubjectToAprDouble.doubleValue();
			}
			Float interestChargeAmount = null;
			var interestChargeAmountDouble = apr.getInterestChargeAmount();
			if (interestChargeAmountDouble != null) {
				interestChargeAmount = (float) interestChargeAmountDouble.doubleValue();
			}
			aprs.add(Apr.builder()
					.percentage((float) apr.getAprPercentage().doubleValue())
					.type(AprType.fromValue(apr.getAprType().getValue()))
					.balanceSubjectToApr(balanceSubjectToApr)
					.interestChargeAmount(interestChargeAmount).build());
		}
		Float lastPaymentAmount = null;
		var lastPaymentAmountDouble = credit.getLastPaymentAmount();
		if (lastPaymentAmountDouble != null) {
			lastPaymentAmount = (float) lastPaymentAmountDouble.doubleValue();
		}
		Float lastStatementBalance = null;
		var lastStatementBalanceDouble = credit.getLastStatementBalance();
		if (lastStatementBalanceDouble != null) {
			lastStatementBalance = (float) lastStatementBalanceDouble.doubleValue();
		}
		Float minimumPaymentAmount = null;
		var minimumPaymentAmountDouble = credit.getMinimumPaymentAmount();
		if (minimumPaymentAmountDouble != null) {
			minimumPaymentAmount = (float) minimumPaymentAmountDouble.doubleValue();
		}

		return CreditInfo.builder().isOverdue(credit.getIsOverdue())
				.lastPaymentAmount(lastPaymentAmount)
				.lastPaymentDate(credit.getLastPaymentDate())
				.lastStatementDate(credit.getLastStatementIssueDate())
				.lastStatementBalance(lastStatementBalance)
				.minimumPayment(minimumPaymentAmount)
				.nextPaymentDueDate(credit.getNextPaymentDueDate())
				.aprs(aprs)
				.build();
	}

	public List<Balance> retrieveBalancesForItem(@NonNull PlaidItem plaidItem) {

		try {
			return getBalancesForItem(plaidItem);
		} catch (IOException e) {
			log.error("IO Exception prevented get balances", e);
			return List.of();
		}
	}

	private List<Balance> getBalancesForItem(PlaidItem plaidItem) throws IOException {

		var request = new AccountsBalanceGetRequest().accessToken(plaidItem.getAccessToken());
		log.debug("Sending balance get request {}", request);
		var response = plaidApi.accountsBalanceGet(request).execute();
		log.debug("Received accounts balance get response {}", response);
		if (!response.isSuccessful()) {
			throw new PlaidApiException(response.message());
		}
		var body = response.body();
		if (body == null) {
			throw new PlaidApiException("Account balances get response body was null");
		}
		var accountBases = body.getAccounts();
		var balances = new ArrayList<Balance>();
		for (AccountBase accountBase : accountBases) {
			var account = plaidItem.getAccounts().stream()
					.filter(a -> accountBase.getAccountId().equals(a.getExternalId())).findFirst().orElseThrow();
			var balance = getBalanceFromAccountBalance(accountBase.getBalances(), account);
			balances.add(balance);
		}
		log.debug("Parsed balances from body {}", balances);
		return balances;
	}

	private Balance getBalanceFromAccountBalance(AccountBalance accountBalance, Account account) {

		Float current = null;
		var currentDouble = accountBalance.getCurrent();
		if (currentDouble != null) {
			current = (float) currentDouble.doubleValue();
		}
		Float available = null;
		var availableDouble = accountBalance.getAvailable();
		if (availableDouble != null) {
			available = (float) availableDouble.doubleValue();
		}
		Float limit = null;
		var limitDouble = accountBalance.getLimit();
		if (limitDouble != null) {
			limit = (float) limitDouble.doubleValue();
		}
		return Balance.builder()
				.timestamp(LocalDateTime.now(clock))
				.current(current)
				.available(available)
				.limit(limit)
				.account(account)
				.build();
	}

	public TransactionUpdate retrieveTransactionSync(@NonNull PlaidItem plaidItem) {

		var added = new ArrayList<Transaction>();
		var modified = new ArrayList<Transaction>();
		var removed = new ArrayList<String>();
		var hasMore = true;
		try {
			do {
				var transactionSync = getTransactionSync(plaidItem);
				added.addAll(transactionSync.getAdded());
				modified.addAll(transactionSync.getModified());
				removed.addAll(transactionSync.getRemoved());
				hasMore = transactionSync.isHasMore();
				plaidItem.setTransactionCursor(transactionSync.getCursor());
			} while (hasMore);
		} catch (IOException e) {
			log.error("IO Exception prevented get transaction sync", e);
		}

		return TransactionUpdate.builder()
				.token(plaidItem.getAccessToken())
				.cursor(plaidItem.getTransactionCursor())
				.hasMore(hasMore)
				.added(added)
				.modified(modified)
				.removed(removed)
				.build();
	}

	private TransactionUpdate getTransactionSync(PlaidItem plaidItem) throws IOException {

		var request = new TransactionsSyncRequest().accessToken(plaidItem.getAccessToken())
				.cursor(plaidItem.getTransactionCursor())
				.options(new TransactionsSyncRequestOptions().includePersonalFinanceCategory(true));
		log.debug("Sending transaction sync get request {}", request);
		var response = plaidApi.transactionsSync(request).execute();
		log.debug("Received transaction sync get response {}", response);
		if (!response.isSuccessful()) {
			throw new PlaidApiException(response.message());
		}
		var body = response.body();
		if (body == null) {
			throw new PlaidApiException("Transaction sync get response body was null");
		}
		var added = new ArrayList<Transaction>();
		for (com.plaid.client.model.Transaction plaidTransaction : body.getAdded()) {
			var account = plaidItem.getAccounts().stream()
					.filter(a -> plaidTransaction.getAccountId().equals(a.getExternalId())).findFirst().orElseThrow();
			var transaction = getTransactionFromTransactionPlaid(plaidTransaction, account);
			added.add(transaction);
		}
		var modified = new ArrayList<Transaction>();
		for (com.plaid.client.model.Transaction plaidTransaction : body.getModified()) {
			var account = plaidItem.getAccounts().stream()
					.filter(a -> plaidTransaction.getAccountId().equals(a.getExternalId())).findFirst().orElseThrow();
			var transaction = getTransactionFromTransactionPlaid(plaidTransaction, account);
			modified.add(transaction);
		}
		var removed = body.getRemoved().stream().map(RemovedTransaction::getTransactionId).toList();
		var transactionSync = TransactionUpdate.builder().token(plaidItem.getAccessToken()).cursor(body.getNextCursor())
				.hasMore(body.getHasMore()).added(added).modified(modified).removed(removed).build();
		log.debug("Parsed transaction sync from body {}", transactionSync);
		return transactionSync;
	}

	private Transaction getTransactionFromTransactionPlaid(com.plaid.client.model.Transaction transactionPlaid,
			Account account) {

		var locationPlaid = transactionPlaid.getLocation();
		Float latitude = null;
		var latitudeDouble = locationPlaid.getLat();
		if (latitudeDouble != null) {
			latitude = (float) latitudeDouble.doubleValue();
		}
		Float longitude = null;
		var longitudeDouble = locationPlaid.getLon();
		if (longitudeDouble != null) {
			longitude = (float) longitudeDouble.doubleValue();
		}
		var location = Location.builder().address(locationPlaid.getAddress())
				.city(locationPlaid.getCity()).region(locationPlaid.getRegion())
				.postalCode(locationPlaid.getPostalCode()).latitude(latitude)
				.longitude(longitude).build();
		var paymentMetaPlaid = transactionPlaid.getPaymentMeta();
		var paymentMeta = PaymentMeta.builder()
				.referenceNumber(paymentMetaPlaid.getReferenceNumber())
				.ppdId(paymentMetaPlaid.getPpdId())
				.method(paymentMetaPlaid.getPaymentMethod())
				.processor(paymentMetaPlaid.getPaymentProcessor())
				.reason(paymentMetaPlaid.getReason()).build();
		LocalDateTime timestamp;
		var dateTime = transactionPlaid.getDatetime();
		var date = transactionPlaid.getDate();
		if (dateTime != null) {
			timestamp = dateTime.atZoneSameInstant(clock.getZone()).toLocalDateTime();
		} else {
			timestamp = date.atStartOfDay().plusHours(12);
		}
		Category category;
		var personalFinanceCategory = transactionPlaid.getPersonalFinanceCategory();
		if (personalFinanceCategory != null) {
			var categoryName = CATEGORY_MAP.getOrDefault(
					personalFinanceCategory.getDetailed(),
					CategoryService.UNCATEGORIZED_NAME);
			category = Category.builder()
					.name(categoryName)
					.build();
		} else {
			category = Category.builder()
					.name(CategoryService.UNCATEGORIZED_NAME)
					.build();
		}
		return Transaction.builder().externalId(transactionPlaid.getTransactionId())
				.location(location).paymentMeta(paymentMeta)
				.name(transactionPlaid.getName())
				.amount((float) transactionPlaid.getAmount().doubleValue())
				.timestamp(timestamp).isPending(transactionPlaid.getPending())
				.merchantName(transactionPlaid.getMerchantName()).account(account)
				.category(category).build();
	}
}
