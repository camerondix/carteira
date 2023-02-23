package com.camerondix.carteira.model.entity;

import java.time.LocalDateTime;

import jakarta.persistence.AttributeOverride;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "transactions")
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Builder
@Getter
@ToString
public class Transaction {

	@Id
	@Column(name = "id", updatable = false, nullable = false)
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Setter
	private Integer id;

	@ManyToOne(fetch = FetchType.LAZY, optional = false, cascade = CascadeType.MERGE)
	@JoinColumn(name = "account_id", nullable = false, updatable = false)
	@NonNull
	private Account account;

	@Column(name = "external_id", updatable = false, length = 38, unique = true)
	private String externalId;

	@Embedded
	@AttributeOverride(name = "address", column = @Column(name = "location_address", length = 40))
	@AttributeOverride(name = "city", column = @Column(name = "location_city", length = 30))
	@AttributeOverride(name = "region", column = @Column(name = "location_region", length = 2))
	@AttributeOverride(name = "postalCode", column = @Column(name = "location_postal_code", length = 5))
	@AttributeOverride(name = "latitude", column = @Column(name = "location_latitude"))
	@AttributeOverride(name = "longitude", column = @Column(name = "location_longitude"))
	@NonNull
	@Setter
	@Builder.Default
	private Location location = Location.builder().build();

	@Embedded
	@AttributeOverride(name = "referenceNumber", column = @Column(name = "payment_reference_number", length = 20))
	@AttributeOverride(name = "ppdId", column = @Column(name = "payment_ppd_id", length = 20))
	@AttributeOverride(name = "payee", column = @Column(name = "payment_payee", length = 20))
	@AttributeOverride(name = "byOrderOf", column = @Column(name = "payment_by_order_of", length = 20))
	@AttributeOverride(name = "payer", column = @Column(name = "payment_payer", length = 20))
	@AttributeOverride(name = "method", column = @Column(name = "payment_method", length = 20))
	@AttributeOverride(name = "processor", column = @Column(name = "payment_processor", length = 20))
	@AttributeOverride(name = "reason", column = @Column(name = "payment_reason", length = 20))
	@NonNull
	@Setter
	@Builder.Default
	private PaymentMeta paymentMeta = PaymentMeta.builder().build();

	@Column(name = "name", nullable = false, length = 100)
	@Setter
	@NonNull
	private String name;

	@Column(name = "amount", nullable = false)
	private float amount;

	@Column(name = "timestamp", nullable = false)
	@Temporal(TemporalType.TIMESTAMP)
	@Setter
	@NonNull
	private LocalDateTime timestamp;

	@Column(name = "is_pending")
	private Boolean isPending;

	@Column(name = "merchant_name", length = 100)
	@Setter
	private String merchantName;

	@ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.MERGE)
	@JoinColumn(name = "category_id", nullable = false)
	@Setter
	@NonNull
	private Category category;

	public Location getLocation() {
		return this.location == null ? Location.builder().build() : this.location;
	}

	public PaymentMeta getPaymentMeta() {
		return this.paymentMeta == null ? PaymentMeta.builder().build() : this.paymentMeta;
	}
}
