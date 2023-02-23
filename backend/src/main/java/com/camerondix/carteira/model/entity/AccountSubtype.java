package com.camerondix.carteira.model.entity;

import lombok.NonNull;

public enum AccountSubtype {

    //@formatter:off
    _401A("401a"),
    _401K("401k"),
    _403B("403B"),
    _457B("457b"),
    _529PLAN("529"),
    BROKERAGE("brokerage"),
    CASH_ISA("cash isa"),
    CRYPTO_EXCHANGE("crypto exchange"),
    EDUCATION_SAVINGS_ACCOUNT("education savings account"),
    EBT("ebt"),
    FIXED_ANNUITY("fixed annuity"),
    GIC("gic"),
    HEALTH_REIMBURSEMENT_ARRANGEMENT("health reimbursement arrangement"),
    HSA("hsa"),
    ISA("isa"),
    IRA("ira"),
    LIF("lif"),
    LIFE_INSURANCE("life insurance"),
    LIRA("lira"),
    LRIF("lrif"),
    LRSP("lrsp"),
    NON_CUSTODIAL_WALLET("non-custodial wallet"),
    NON_TAXABLE_BROKERAGE_ACCOUNT("non-taxable brokerage account"),
    OTHER("other"),
    OTHER_INSURANCE("other insurance"),
    OTHER_ANNUITY("other annuity"),
    PRIF("prif"),
    RDSP("rdsp"),
    RESP("resp"),
    RLIF("rlif"),
    RRIF("rrif"),
    PENSION("pension"),
    PROFIT_SHARING_PLAN("profit sharing plan"),
    RETIREMENT("retirement"),
    ROTH("roth"),
    ROTH_401K("roth 401k"),
    RRSP("rrsp"),
    SEP_IRA("sep ira"),
    SIMPLE_IRA("simple ira"),
    SIPP("sipp"),
    STOCK_PLAN("stock plan"),
    THRIFT_SAVINGS_PLAN("thrift savings plan"),
    TFSA("tfsa"),
    TRUST("trust"),
    UGMA("ugma"),
    UTMA("utma"),
    VARIABLE_ANNUITY("variable annuity"),
    CREDIT_CARD("credit card"),
    PAYPAL("paypal"),
    CD("cd"),
    CHECKING("checking"),
    SAVINGS("savings"),
    MONEY_MARKET("money market"),
    PREPAID("prepaid"),
    AUTO("auto"),
    BUSINESS("business"),
    COMMERCIAL("commercial"),
    CONSTRUCTION("construction"),
    CONSUMER("consumer"),
    HOME_EQUITY("home equity"),
    LOAN("loan"),
    MORTGAGE("mortgage"),
    OVERDRAFT("overdraft"),
    LINE_OF_CREDIT("line of credit"),
    STUDENT("student"),
    CASH_MANAGEMENT("cash management"),
    KEOGH("keogh"),
    MUTUAL_FUND("mutual fund"),
    RECURRING("recurring"),
    REWARDS("rewards"),
    SAFE_DEPOSIT("safe deposit"),
    SARSEP("sarsep"),
    PAYROLL("payroll"),
    NULL("null"),
    ENUM_UNKNOWN("ENUM_UNKNOWN");
	//@formatter:on

    @NonNull
    private String value;

    AccountSubtype(@NonNull String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }

    @Override
    public String toString() {
        return String.valueOf(value);
    }

    public static AccountSubtype fromValue(@NonNull String value) {
        for (AccountSubtype b : AccountSubtype.values()) {
            if (b.value.equals(value)) {
                return b;
            }
        }
        return ENUM_UNKNOWN;
    }
}
