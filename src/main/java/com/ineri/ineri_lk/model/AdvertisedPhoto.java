package com.ineri.ineri_lk.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

/**
 * @author linqcod
 */

@Entity
@Table(name = "advertised_photos")
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class AdvertisedPhoto extends AbstractModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "form_id")
    private Form form;

    @ManyToOne
    @JoinColumn(name = "advertised_id")
    private Advertised advertised;

    String path;

}
