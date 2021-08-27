package com.rudii.Stock.model;

import javax.persistence.*;
import java.time.LocalDate;

@Entity /** Specifies that the class is an entity and is mapped to a database table */
@Table(name = "users")/** Specifies the table name of the database */
/** Users Class Entity */
public class Users {

    /* AUTO INCREMENT FOR ID's /
    @Id /** Specifies the primary key of an entity /
    @SequenceGenerator(
            name = "user_sequence",
            sequenceName = "user_sequence", /** name of the sequence in the DB /
            allocationSize = 1 /** sequence value * allocationSize /
    )

    /** Gives the generation strategy for the values of primary key /
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "user_sequence"
    )
    */
    /** Attributes */
    @Id
    private String email;
    private String firstName;
    private String lastName;
    private String password;

    /* NO-ARG Constructor */
    public Users() {

    }

    /** User Constructor */
    public Users(String firstName,
                 String lastName,
                 String email,
                 String password) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
    }

    /* User Constructor without ARG ID since ID is AUTO_INCREMENT/
    public Users(String firstName,
                 String lastName,
                 String email,
                 String password) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
    }
     */

    /** GETTERS & SETTERS */
    //public int getId() {
    //    return id;
    //}

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    //public void setId(int id) {
    //    this.id = id;
    //}


    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPassword(String password) {
        this.password = password;
    }


    /** TO STRING */
    @Override
    public String toString() {
        return "User{" +
               // "id=" + id +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", email='" + email + '\'' +
                ", password=" + password +
                '}';
    }
}
