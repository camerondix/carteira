package com.camerondix.carteira.controller;

import java.time.Clock;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.jetbrains.annotations.Nullable;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.graphql.data.method.annotation.SchemaMapping;
import org.springframework.stereotype.Controller;

import com.camerondix.carteira.model.entity.Account;
import com.camerondix.carteira.model.entity.Category;
import com.camerondix.carteira.model.entity.Transaction;
import com.camerondix.carteira.model.input.LocationInput;
import com.camerondix.carteira.model.input.PaymentMetaInput;
import com.camerondix.carteira.model.input.TransactionInput;
import com.camerondix.carteira.service.AccountService;
import com.camerondix.carteira.service.CategoryService;
import com.camerondix.carteira.service.TransactionService;
import com.camerondix.carteira.utility.CursorUtility;

import graphql.relay.Connection;
import graphql.relay.DefaultConnection;
import graphql.relay.DefaultEdge;
import graphql.relay.DefaultPageInfo;
import graphql.relay.Edge;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
public class TransactionController {

	private final TransactionService transactionService;

	private final AccountService accountService;

	private final CategoryService categoryService;

	private final CursorUtility cursorUtility;

	private final Clock clock;

	public TransactionController(TransactionService transactionService, AccountService accountService,
			CategoryService categoryService, CursorUtility cursorUtility, Clock clock) {

		log.debug("Initializing transaction controller");
		this.transactionService = transactionService;
		this.accountService = accountService;
		this.categoryService = categoryService;
		this.cursorUtility = cursorUtility;
		this.clock = clock;
	}

	@QueryMapping
	public Transaction transaction(@Argument Integer id) {

		log.info("Getting transaction from id {}", id);
		return transactionService.retrieveById(id);
	}

	@QueryMapping
	public Connection<Transaction> transactions(@Argument int first, @Argument @Nullable String after) {

		var afterId = after == null ? Integer.MAX_VALUE : cursorUtility.idFromCursor(after);
		var afterTime = after == null ? LocalDateTime.now(clock) : cursorUtility.timeFromCursor(after);
		var slice = transactionService.retrieveTransactionsSlice(first, afterId, afterTime);

		List<Edge<Transaction>> edges = slice.getContent().stream()
				.map(t -> new DefaultEdge<>(t, cursorUtility.cursorFromIdAndTime(t.getId(), t.getTimestamp())))
				.collect(Collectors.toUnmodifiableList());

		var pageInfo = new DefaultPageInfo(
				cursorUtility.getFirstCursorFrom(edges),
				cursorUtility.getLastCursorFrom(edges),
				false,
				slice.hasNext());

		return new DefaultConnection<>(edges, pageInfo);
	}

	@SchemaMapping
	public Account account(Transaction transaction) {

		log.info("Getting account from transaction {}", transaction);
		return accountService.retrieveById(transaction.getAccount().getId());
	}

	@SchemaMapping
	public Category category(Transaction transaction) {

		log.info("Getting category from transaction {}", transaction);
		return categoryService.retrieveById(transaction.getCategory().getId());
	}

	@MutationMapping
	public Transaction updateTransaction(@Argument TransactionInput input) {

		log.debug("Updating transaction from input {}", input);
		var transaction = transactionService.retrieveById(input.getId());
		transaction.setName(input.getName());
		transaction.setTimestamp(input.getTimestamp());
		transaction.setCategory(categoryService.retrieveById(input.getCategoryId()));
		return transactionService.update(transaction);
	}

	@MutationMapping
	public Transaction updateLocation(@Argument LocationInput input) {

		log.debug("Updating location from input {}", input);
		var transaction = transactionService.retrieveById(input.getTransactionId());
		transaction.setMerchantName(input.getMerchantName());
		var location = transaction.getLocation();
		location.setAddress(input.getAddress());
		location.setCity(input.getCity());
		location.setRegion(input.getRegion());
		location.setPostalCode(input.getPostalCode());
		location.setLatitude(input.getLatitude());
		location.setLongitude(input.getLongitude());
		transaction.setLocation(location);
		return transactionService.update(transaction);
	}

	@MutationMapping
	public Transaction updatePaymentMeta(@Argument PaymentMetaInput input) {

		log.debug("Updating payment meta from input {}", input);
		var transaction = transactionService.retrieveById(input.getTransactionId());
		var paymentMeta = transaction.getPaymentMeta();
		paymentMeta.setReferenceNumber(input.getReferenceNumber());
		paymentMeta.setPpdId(input.getPpdId());
		paymentMeta.setPayee(input.getPayee());
		paymentMeta.setByOrderOf(input.getByOrderOf());
		paymentMeta.setPayer(input.getPayer());
		paymentMeta.setMethod(input.getMethod());
		paymentMeta.setProcessor(input.getProcessor());
		paymentMeta.setReason(input.getReason());
		transaction.setPaymentMeta(paymentMeta);
		return transactionService.update(transaction);
	}
}
