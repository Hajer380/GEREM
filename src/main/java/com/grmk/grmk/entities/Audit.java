package com.grmk.grmk.entities;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.util.Date;


@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)

public abstract class Audit<U> {
    @JsonProperty("createdBy")
     @CreatedBy
    @Column(name = "created_by", length=45,updatable = false)
    private String createdBy;


    @JsonProperty("createdAt")
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "created_at", nullable = false, updatable = false)
    @CreatedDate
    private Date createdAt;

    @JsonProperty("updatedBy")
    @LastModifiedBy
    @Column(name = "updated_by", length=45)
    private String lastModifiedBy;

    @JsonProperty("updatedAt")
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "updated_at", nullable = false)
    @LastModifiedDate
    private Date lastModifiedDate;
    public Audit(String createdBy, String lastModifiedBy) {
        super();
        this.createdBy = createdBy;
        this.lastModifiedBy = lastModifiedBy;
    }
    public Audit() {
        super();
        // TODO Auto-generated constructor stub
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public String getLastModifiedBy() {
        return lastModifiedBy;
    }

    public void setLastModifiedBy(String lastModifiedBy) {
        this.lastModifiedBy = lastModifiedBy;
    }

    public Date getLastModifiedDate() {
        return lastModifiedDate;
    }

    public void setLastModifiedDate(Date lastModifiedDate) {
        this.lastModifiedDate = lastModifiedDate;
    }



}
