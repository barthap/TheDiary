package com.hapex.diary.controller;

import com.hapex.diary.dao.PeopleDao;
import com.hapex.diary.model.Person;
import org.joda.time.LocalDate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.Optional;

/**
 * Created by barthap on 18.10.2018.
 * No idea what to write here
 * *you know, no IDEA, IntelliJ IDEA xDDD
 */
@RestController
@RequestMapping("/people")
public class PeopleController {

    private final PeopleDao dao;

    @Autowired
    public PeopleController(PeopleDao dao) {
        this.dao = dao;
    }

    @GetMapping
    public Page<Person> getAll(Pageable pageable) {
        return dao.findAll(pageable);
    }

    @GetMapping("/count")
    public int getCount() {
        return dao.countAll();
    }

    @PostMapping("/add/{name}")
    public Person addPerson(@PathVariable String name) {
        return dao.save(new Person(name, "Desc " + name, new LocalDate()));
    }

    @GetMapping("/get/{id}")
    public Person getPerson(@PathVariable long id) {
        return Optional.ofNullable(dao.findById(id)).orElseThrow(() ->  new RuntimeException("Person Not found!") );
    }

    @DeleteMapping("/delete/{id}")
    public void deletePerson(@PathVariable long id) {
        dao.deleteById(id);
    }
}
