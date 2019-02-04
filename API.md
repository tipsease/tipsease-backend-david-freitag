# Company endpoints

## DB Schema

![Schema Flowchart](/tipsease.png)

# Company endpoints

## `GET /api/companies`

### returns

```json
[
  {
    "id": integer,
    "name": string,
    "address": string
  }
]
```

# Tipper endpoints

## `GET /api/tippers`

### returns

```json
[
  {
    "id": integer,
    "name": string,
    "photo_url": string,
    "email": string
  },
  {
    "id": integer,
    "name": string,
    "photo_url": string,
    "email": string
  }
]
```

## `GET /api/tipper/:id`

### returns

```json
[
  {
    "name": string,
    "photo_url": string,
    "email": string
  }
]
```

## `DELETE /api/tipper/:id`

### returns

```json
[
  {
    "name": string,
    "email": string
  }
]
```

## `PUT /api/tipper/:id`

### injest

```json
    {
        "name": string:required,
    }
```

### returns

```json
[
  {
    "id": integer,
    "name": string,
    "photo_url": string,
    "email": string
  }
]
```

# Tippee endpoints

## `GET /api/tippees/`

### returns

```json
[
  {
    "id": integer,
    "name": string,
    "company": string,
    "photo_url": string,
    "start-date": integer,
    "email": string,
    "tagline": text,
    "qr_url": text
  },
  {
    "id": integer,
    "name": string,
    "company": string,
    "photo_url": string,
    "email": string,
    "tagline": text,
    "qr_url": text
  }
]
```

# `GET /api/tippees/:id`

### returns

```json
[
  {
    "name": string,
    "email": string,
    "company": string
  }
]
```

# `PUT /api/tippeess/:id`

### injest

```json
[
    {
    "name": string:required,
    "company": string,
    "company-address": string,
    "photo_url": string,
    "start-date": integer,
    "email": string,
    "tagline": text,
    "qr_url": text
    }
]
```

### returns

```json
[
    {
    "name": string:required,
    "company": string,
    "photo_url": string,
    "start-date": integer,
    "email": string,
    "tagline": text,
    "qr_url": text
    }
]
```

## `DELETE /api/tipper/:id`

### returns

```json
[
  {
    "name": string,
    "email": string,
    "company": string
  }
]
```

# Register endpoints

## `POST /api/register/tipper`

### injest

```json
[
  {
    "id": integer,
    "name": string,
    "photo_url": string,
    "email": string
  }
]
```

## `POST /api/register/tippee`

### injest

```json
[
  {
    "name": string:required,
    "company": string,
    "company-address": string,
    "photo_url": string,
    "start-date": integer,
    "email": string,
    "tagline": text,
    "qr_url": text
  }
]
```


# Tipping endpoints

## `POST /api/tippee/:id/tips`

### injest

```json
[
  {
    "tipper_id": integer,
    "amount": float 
  }
]
```

#### MVP:

- [ ] roll our own authsystem

#### STRETCH IDEAS:

- [ ] OAUTH
- [ ] QR CODES
- [ ] STRIPE INTEGRATION
- [ ] GRAPH QL + REST API (dual system)

```

```