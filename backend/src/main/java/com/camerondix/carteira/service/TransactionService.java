package com.camerondix.carteira.service;

import java.security.InvalidParameterException;
import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;

import com.camerondix.carteira.data.TransactionRepository;
import com.camerondix.carteira.model.entity.Transaction;

import lombok.NonNull;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class TransactionService {

    private final TransactionRepository transactionRepository;

    @Autowired
    public TransactionService(TransactionRepository transactionRepository) {

        log.debug("Initializing transaction service");
        this.transactionRepository = transactionRepository;
    }

    public List<Transaction> createAll(@NonNull List<Transaction> transactions) {

        log.debug("Creating transactions {}", transactions);
        transactions.sort(Comparator.comparing(Transaction::getTimestamp));
        var savedTransactions = transactionRepository.saveAll(transactions);
        log.debug("Created transactions {}", savedTransactions);
        return savedTransactions;
    }

    public Transaction retrieveById(@NonNull Integer id) {

        log.debug("Retrieving transaction by id {}", id);
        var transaction = transactionRepository.findById(id).orElseThrow();
        log.debug("Retrieved transaction {}", transaction);
        return transaction;
    }

    public Transaction retrieveReferenceByExternalId(@NonNull String externalId) {

        log.debug("Retrieving transaction reference by external id {}", externalId);
        var transaction = Optional.ofNullable(transactionRepository.getReferenceByExternalId(externalId)).orElseThrow();
        log.debug("Retrieved transaction {}", transaction);
        return transaction;
    }

    public Slice<Transaction> retrieveTransactionsSlice(int first, @NonNull Integer afterId,
            @NonNull LocalDateTime afterTime) {

        log.debug("Retrieving first {} transactions after id {} and time {}", first, afterId, afterTime);
        var transactions = transactionRepository.findAllCursorBasedPagination(PageRequest.of(0, first), afterId,
                afterTime);
        log.debug("Retrieved transactions {}", transactions);
        return transactions;
    }

    public Transaction update(@NonNull Transaction transaction) {

        log.debug("Updating transaction", transaction);
        if (transaction.getId() == null) {
            throw new InvalidParameterException(
                    "The transaction must have a valid id to be updated");
        }
        var savedTransaction = transactionRepository.save(transaction);
        log.debug("Updated transaction {}", savedTransaction);
        return savedTransaction;
    }

    public List<Transaction> updateAll(@NonNull List<Transaction> transactions) {

        log.debug("Updating transactions {}", transactions);
        if (transactions.stream().anyMatch(t -> t.getId() == null)) {
            throw new InvalidParameterException(
                    "All transactions must have a valid id to be updated");
        }
        transactions.sort(Comparator.comparing(Transaction::getTimestamp));
        var savedTransactions = transactionRepository.saveAll(transactions);
        log.debug("Updated transactions {}", savedTransactions);
        return savedTransactions;
    }

    public void deleteAll(@NonNull List<Transaction> transactions) {

        log.debug("Deleting transactions {}", transactions);
        if (transactions.stream().anyMatch(t -> t.getId() == null)) {
            throw new InvalidParameterException(
                    "All transactions must have a valid id to be deleted");
        }
        transactionRepository.deleteAll(transactions);
        log.debug("Deleted transactions {}", transactions);
    }
}
