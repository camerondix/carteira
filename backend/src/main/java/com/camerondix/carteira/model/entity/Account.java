package com.camerondix.carteira.model.entity;

import java.util.List;

import jakarta.persistence.AttributeOverride;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "accounts")
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Builder
@Getter
@ToString(exclude = { "currentBalance", "balances", "transactions" })
public class Account {

    @Id
    @Column(name = "id", updatable = false, nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Setter
    private Integer id;

    @Column(name = "external_id", updatable = false, length = 37, unique = true)
    private String externalId;

    @Column(name = "official_name", updatable = false, nullable = false, length = 100)
    @NonNull
    private String officialName;

    @Column(name = "name", nullable = false, length = 100)
    @Setter
    @NonNull
    private String name;

    @Column(name = "type", updatable = false, nullable = false, length = 16)
    @Enumerated(EnumType.STRING)
    @NonNull
    private AccountType type;

    @Column(name = "subtype", updatable = false, nullable = false, length = 39)
    @Enumerated(EnumType.STRING)
    @NonNull
    private AccountSubtype subtype;

    @Column(name = "mask", updatable = false, length = 4)
    private String mask;

    @Column(name = "error", length = 50)
    private String error;

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.MERGE)
    @Setter
    private Balance currentBalance;

    @OneToMany(cascade = CascadeType.MERGE, mappedBy = "account")
    @NonNull
    @Builder.Default
    private List<Balance> balances = List.of();

    @OneToMany(cascade = CascadeType.MERGE, mappedBy = "account")
    @NonNull
    @Builder.Default
    private List<Transaction> transactions = List.of();

    @Embedded
    @AttributeOverride(name = "routingNumber", column = @Column(name = "depository_routing_number", length = 9))
    @AttributeOverride(name = "accountNumber", column = @Column(name = "depository_account_number", length = 16))
    @Setter
    @NonNull
    @Builder.Default
    private DepositoryInfo depositoryInfo = DepositoryInfo.builder().build();

    @Embedded
    @AttributeOverride(name = "isOverdue", column = @Column(name = "credit_is_overdue"))
    @AttributeOverride(name = "lastPaymentAmount", column = @Column(name = "credit_last_payment_amount"))
    @AttributeOverride(name = "lastPaymentDate", column = @Column(name = "credit_last_payment_date"))
    @AttributeOverride(name = "lastStatementDate", column = @Column(name = "credit_last_statement_date"))
    @AttributeOverride(name = "lastStatementBalance", column = @Column(name = "credit_last_statement_balance"))
    @AttributeOverride(name = "minimumPayment", column = @Column(name = "credit_minimum_payment"))
    @AttributeOverride(name = "nextPaymentDueDate", column = @Column(name = "credit_next_payment_due_date"))
    @Setter
    @NonNull
    @Builder.Default
    private CreditInfo creditInfo = CreditInfo.builder().build();

    public DepositoryInfo getDepositoryInfo() {
        return this.depositoryInfo == null ? DepositoryInfo.builder().build() : this.depositoryInfo;
    }

    public CreditInfo getCreditInfo() {
        return this.creditInfo == null ? CreditInfo.builder().build() : this.creditInfo;
    }
}
