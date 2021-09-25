package com.rudii.Stock.model;

import com.fasterxml.jackson.databind.util.JSONWrappedObject;
import com.vladmihalcea.hibernate.type.array.EnumArrayType;
import com.vladmihalcea.hibernate.type.array.ListArrayType;
import com.vladmihalcea.hibernate.type.array.StringArrayType;
import com.vladmihalcea.hibernate.type.json.JsonBinaryType;
import com.vladmihalcea.hibernate.type.json.JsonBlobType;
import com.vladmihalcea.hibernate.type.json.JsonType;
import org.hibernate.annotations.Type;
import org.hibernate.annotations.TypeDef;

import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Entity
/* Specifies that the class is an entity and is mapped to a database table */
@Table
@TypeDef(name = "jsonb", typeClass = JsonBinaryType.class)
public class UsersPositions implements Serializable {

    /* AUTO INCREMENT FOR ID's /
    @Id /* Specifies the primary key of an entity /
    @SequenceGenerator(
            name = "userposition_sequence",
            sequenceName = "userposition_sequence", /* name of the sequence in the DB /
            allocationSize = 1 /* sequence value * allocationSize /
    )

    /* Gives the generation strategy for the values of primary key /
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "userposition_sequence"
    )
     */
    @Id
    private String user_email;
    private Integer balance;
    private Integer portfolioBalance;
    @Type(type = "jsonb")
    @Lob
    @Column(columnDefinition = "jsonb")
    private List<Positions> positions;

    public UsersPositions() {

    }

    public UsersPositions(String user_email, Integer balance, Integer portfolioBalance, List<Positions> positions) {
        this.user_email = user_email;
        this.balance = balance;
        this.portfolioBalance = portfolioBalance;
        this.positions = positions;
    }

    public void setUser_email(String user_email) {
        this.user_email = user_email;
    }

    public Integer getBalance() {
        return balance;
    }

    public void setBalance(Integer balance) {
        this.balance = balance;
    }

    public String getUser_email() {
        return user_email;
    }

    public void user_email(String user_email) {
        this.user_email = user_email;
    }

    public List<Positions> getPositions() {
        return positions;
    }

    public void setPositions(List<Positions> positions) {
        this.positions = positions;
    }

    public Integer getPortfolioBalance() {
        return portfolioBalance;
    }

    public void setPortfolioBalance(Integer portfolioBalance) {
        this.portfolioBalance = portfolioBalance;
    }

    //public Positions getPositions() {
    //    return positions;
    //}

    //public void setPositions(Positions positions) {
    //    this.positions = positions;
    //}
}
