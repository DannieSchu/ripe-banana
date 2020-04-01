# Ripe Banana

## Description

A database of films, movie studios, actors, reviews and reviewers.

## Models

* Studio
* Film
* Actor
* Reviewer
* Review

## Routes

### GET

While the schemas should look like the data definitions above, these are descriptions of the data that should be returned from the various `GET` methods. You will need to use `lean`, `populate`, `select` and combining data to shape the appropriate response.

#### `GET /studios`

```
[{ _id, name }]
```

#### `GET /studios/:id`

```
{ 
    _id, 
    name, 
    address, 
    films: [{ _id, title }] 
}
```

#### `GET /films`

```
[{
    _id, 
    title, 
    released,
    studio: { _id, name }
}]
```

#### `GET /films/:id`

```
{
    title,
    released,
    studio: { _id, name },
    cast: [{
        _id,
        role,
        actor: { _id, name }
    }],
    reviews: [{
        id,
        rating,
        review,
        reviewer: { _id, name }
    ]
}
```

#### `GET /actors`

```
[{ _id, name }]
```

#### `GET /actors/:id`

```
{
    name,
    dob,
    pob,
    films: [{
      id,
      title,
      released
    }]
}
```

#### `GET /reviewers`

```
[{
  _id,
  name,
  company
}]
```

#### `GET /reviewers/:id`

```
{
    _id,
    name,
    company,
    reviews: [{
        _id,
        rating,
        review,
        film: { _id, title }
    }]
}
```

#### `GET /reviews`

**limited to 100 highest rated**

```
[{
    _id,
    rating,
    review,
    film: { _id, title }
}]
```

### POST
#### `POST /reviews`
#### `POST /studios`
#### `POST /films`
#### `POST /actors`
#### `POST /reviewers`

### PATCH
#### `PATCH /reviewers/:id`

### DELETE
#### `DELETE /reviews/:id`
#### `DELETE /reviewers/:id`
  * Reviewers cannot be deleted if there are reviews

