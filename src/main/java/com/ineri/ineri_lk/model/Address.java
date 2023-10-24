package com.ineri.ineri_lk.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

/**
 * @author linqcod
 */
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@Entity
@Table(name = "addresses")
public class Address extends AbstractModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private Long id;
    @Column
    private String fullAddress;
    @ManyToOne
    @JoinColumn(name = "city_id")
    private City city;

    public Address(City city, String fullAddress) {
        this.city = city;
        this.fullAddress = fullAddress;
    }

}
