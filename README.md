# Transaction Management Fullstack

This project involves the development of a fullstack application using NestJS for the backend, React with TypeScript for the frontend, and Tailwind CSS for styling. The application enables the recording of financial transactions and viewing the transaction history.

The backend of the application, built with NestJS, is designed to implement the Accounting API specification, which is defined in the Open API format. The API includes various endpoints for creating and retrieving transactions and account data.

<details>
<summary>Accounting API Specification</summary>

```json
{
  "openapi": "3.0.0",
  "info": {
    "title": "Accounting API",
    "version": "3.1.0"
  },
  "components": {
    "schemas": {
      "TransactionRequest": {
        "type": "object",
        "properties": {
          "account_id": {
            "type": "string",
            "format": "uuid"
          },
          "amount": {
            "type": "integer"
          }
        },
        "required": ["transaction_id", "account_id", "amount"]
      },
      "Transaction": {
        "type": "object",
        "properties": {
          "transaction_id": {
            "type": "string",
            "format": "uuid"
          },
          "account_id": {
            "type": "string",
            "format": "uuid"
          },
          "amount": {
            "type": "integer"
          },
          "created_at": {
            "type": "string",
            "format": "date-time"
          }
        },
        "required": ["transaction_id", "account_id", "amount", "created_at"]
      },
      "ArrayOfTransactions": {
        "type": "array",
        "items": {
          "$ref": "#/components/schemas/Transaction"
        }
      },
      "Account": {
        "type": "object",
        "properties": {
          "account_id": {
            "type": "string",
            "format": "uuid"
          },
          "balance": {
            "type": "integer"
          }
        },
        "required": ["account_id", "balance"]
      }
    },
    "examples": {
      "TransactionRequestWithPositiveAmount": {
        "value": {
          "account_id": "0afd02d3-6c59-46e7-b7bc-893c5e0b7ac2",
          "amount": 7
        }
      },
      "TransactionRequestWithNegativeAmount": {
        "value": {
          "account_id": "5ae0ef78-e902-4c40-9f53-8cf910587312",
          "amount": -4
        }
      },
      "TransactionWithPositiveAmount": {
        "value": {
          "transaction_id": "4bcc3959-6fe1-406e-9f04-cad2637b47d5",
          "account_id": "0afd02d3-6c59-46e7-b7bc-893c5e0b7ac2",
          "amount": 7,
          "created_at": "2021-05-12T18:29:40.206924+00:00"
        }
      },
      "TransactionWithNegativeAmount": {
        "value": {
          "transaction_id": "050a75f6-8df1-4ad1-8f5b-54e821e98581",
          "account_id": "5ae0ef78-e902-4c40-9f53-8cf910587312",
          "amount": -4,
          "created_at": "2021-05-18T21:33:47.203136+00:00"
        }
      },
      "ArrayOfTransactionsExample": {
        "value": [
          {
            "transaction_id": "4bcc3959-6fe1-406e-9f04-cad2637b47d5",
            "account_id": "0afd02d3-6c59-46e7-b7bc-893c5e0b7ac2",
            "amount": 7,
            "created_at": "2021-05-12T18:29:40.206924+00:00"
          },
          {
            "transaction_id": "050a75f6-8df1-4ad1-8f5b-54e821e98581",
            "account_id": "5ae0ef78-e902-4c40-9f53-8cf910587312",
            "amount": -4,
            "created_at": "2021-05-18T21:33:47.203136+00:00"
          }
        ]
      },
      "PositiveAccount": {
        "value": {
          "account_id": "fbf4a552-2418-46c5-b308-6094ddc493a1",
          "balance": 10
        }
      },
      "NegativeAccount": {
        "value": {
          "account_id": "9c3cd9a8-65c4-4d26-8488-ef9a40f57c37",
          "balance": -7
        }
      },
      "MaxTransactionVolumeExample": {
        "value": {
          "maxVolume": 4,
          "accountIds": [
            "44a92331-a533-4dd3-82e3-3ff75219e33b",
            "7c9be9e8-a6df-4f43-9a44-38c10ad0de4a"
          ]
        }
      }
    }
  },
  "paths": {
    "/ping": {
      "get": {
        "summary": "Healhcheck to make sure the service is up.",
        "responses": {
          "200": {
            "description": "The service is up and running."
          }
        }
      }
    },
    "/transactions": {
      "post": {
        "summary": "Creates a new transaction.",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/TransactionRequest"
              },
              "examples": {
                "TransactionRequestWithPositiveAmount": {
                  "$ref": "#/components/examples/TransactionRequestWithPositiveAmount"
                },
                "TransactionRequestWithNegativeAmount": {
                  "$ref": "#/components/examples/TransactionRequestWithNegativeAmount"
                }
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": "Transaction created.",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Transaction"
                },
                "examples": {
                  "TransactionWithPositiveAmount": {
                    "$ref": "#/components/examples/TransactionWithPositiveAmount"
                  }
                }
              }
            }
          },
          "400": {
            "description": "Mandatory body parameters missing or have incorrect type."
          },
          "405": {
            "description": "Specified HTTP method not allowed."
          },
          "415": {
            "description": "Specified content type not allowed."
          }
        }
      },
      "get": {
        "summary": "Get transactions",
        "responses": {
          "200": {
            "description": "Returns all previously created transactions.",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ArrayOfTransactions"
                },
                "examples": {
                  "ArrayOfTransactionsExample": {
                    "$ref": "#/components/examples/ArrayOfTransactionsExample"
                  }
                }
              }
            }
          }
        }
      }
    },
    "/transactions/{transaction_id}": {
      "get": {
        "summary": "Returns the transaction by id.",
        "parameters": [
          {
            "name": "transaction_id",
            "in": "path",
            "required": true,
            "description": "Transaction ID",
            "schema": {
              "type": "string",
              "format": "uuid"
            },
            "example": "023d2024-24bc-42c9-ab24-689eef6ea0f9"
          }
        ],
        "responses": {
          "200": {
            "description": "Transaction details.",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Transaction"
                },
                "examples": {
                  "TransactionWithPositiveAmount": {
                    "$ref": "#/components/examples/TransactionWithPositiveAmount"
                  },
                  "TransactionWithNegativeAmount": {
                    "$ref": "#/components/examples/TransactionWithNegativeAmount"
                  }
                }
              }
            }
          },
          "400": {
            "description": "transaction_id missing or has incorrect type."
          },
          "404": {
            "description": "Transaction not found"
          }
        }
      }
    },
    "/accounts/{account_id}": {
      "get": {
        "summary": "Returns the account data.",
        "parameters": [
          {
            "name": "account_id",
            "in": "path",
            "required": true,
            "description": "Account ID.",
            "schema": {
              "type": "string",
              "format": "uuid"
            },
            "example": "5ba6e1b0-e3e7-483a-919a-a2fc17629a90"
          }
        ],
        "responses": {
          "200": {
            "description": "Account data.",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Account"
                },
                "examples": {
                  "PositiveAccount": {
                    "$ref": "#/components/examples/PositiveAccount"
                  },
                  "NegativeAccount": {
                    "$ref": "#/components/examples/NegativeAccount"
                  }
                }
              }
            }
          },
          "400": {
            "description": "account_id missing or has incorrect type."
          },
          "404": {
            "description": "Account not found."
          }
        }
      }
    }
  }
}
```

</details>

The frontend of the application, developed using React with TypeScript, consists of a form for submitting transactions and a transaction list. The transaction list displays the withdrawn or deposited amount for each transaction, along with the affected account ID. It also shows the current balance for the last submitted transaction. The frontend design is enhanced using Tailwind CSS.

#### UI Mockup

![Accounting App Frontend](https://user-images.githubusercontent.com/450319/139797772-4e4b2744-447c-411f-9b04-7028ba5e89a1.png)

The frontend also includes a form for submitting transactions. Both input fields are cleared after the form is submitted. Every new transaction goes on the top of the list and is enclosed in a `<div />` with specific data attributes.

The project aims to pass the provided E2E tests, keep the server data in memory, implement client-side validation of the form data, and unit test one module of choice. The codebase is designed to avoid duplication and extract reusable modules where it makes sense, ensuring easy maintenance.

The transaction list displays the withdrawn or deposited amount for each transaction, along with the affected account ID. It also shows the current balance for the last submitted transaction.
