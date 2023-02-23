package com.camerondix.carteira.model.entity;

import java.time.LocalDate;
import java.util.List;

import jakarta.persistence.AttributeOverride;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Embeddable;
import jakarta.persistence.FetchType;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.ToString;

@Embeddable
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Builder
@Getter
@ToString
public class CreditInfo {

	private Boolean isOverdue;

	private Float lastPaymentAmount;

	@Temporal(TemporalType.DATE)
	private LocalDate lastPaymentDate;

	@Temporal(TemporalType.DATE)
	private LocalDate lastStatementDate;

	private Float lastStatementBalance;

	private Float minimumPayment;

	@Temporal(TemporalType.DATE)
	private LocalDate nextPaymentDueDate;

	@ElementCollection(fetch = FetchType.EAGER)
	@AttributeOverride(name = "percentage", column = @Column(name = "percentage", nullable = false))
	@AttributeOverride(name = "type", column = @Column(name = "type", nullable = false, length = 20))
	@AttributeOverride(name = "balanceSubjectToApr", column = @Column(name = "balance_subject_to_apr"))
	@AttributeOverride(name = "interestChargeAmount", column = @Column(name = "interest_charge_amount"))
	@NonNull
	@Builder.Default
	private List<Apr> aprs = List.of();

	public boolean isEmpty() {

		return isOverdue == null &&
				lastPaymentAmount == null &&
				lastPaymentDate == null &&
				lastStatementDate == null &&
				lastStatementBalance == null &&
				minimumPayment == null &&
				nextPaymentDueDate == null &&
				aprs.isEmpty();
	}
}
