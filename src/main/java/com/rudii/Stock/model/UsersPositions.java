package com.rudii.Stock.model;

import com.vladmihalcea.hibernate.type.json.JsonBinaryType;
import org.hibernate.annotations.Type;
import org.hibernate.annotations.TypeDef;

import javax.persistence.*;

@Entity
/* Specifies that the class is an entity and is mapped to a database table */
@Table
@TypeDef(name = "jsonb", typeClass = JsonBinaryType.class)
public class UsersPositions {

    /* AUTO INCREMENT FOR ID's */
    @Id /* Specifies the primary key of an entity */
    @SequenceGenerator(
            name = "userposition_sequence",
            sequenceName = "userposition_sequence", /* name of the sequence in the DB */
            allocationSize = 1 /* sequence value * allocationSize */
    )

    /* Gives the generation strategy for the values of primary key */
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "userposition_sequence"
    )
    private int account_id;
    @Type(type = "jsonb")
    @Column(columnDefinition = "jsonb")
    private Positions test;

    public UsersPositions() {

    }

    public UsersPositions(int id, Positions test) {
        this.account_id = id;
        this.test = test;
    }

    public int getAccount_id() {
        return account_id;
    }

    public void setAccount_id(int account_id) {
        this.account_id = account_id;
    }

    public Positions getTest() {
        return test;
    }

    public void setTest(Positions test) {
        this.test = test;
    }
}
