# Database Design Document
## School Competency Assessment System

### 📋 Table of Contents
1. [Overview](#overview)
2. [Database Architecture](#database-architecture)
3. [Entity Relationship Diagram](#entity-relationship-diagram)
4. [Collection/Table Structures](#collectiontable-structures)
5. [Relationships](#relationships)
6. [Indexes](#indexes)
7. [Data Flow](#data-flow)
8. [Security Considerations](#security-considerations)
9. [Performance Optimization](#performance-optimization)
10. [Backup and Recovery](#backup-and-recovery)

---

## Overview

The School Competency Assessment System uses **MongoDB** as its primary database with **Mongoose ODM** for schema management. The database is designed to handle user authentication, assessment questions, user responses, and certificate generation.

### Database Type: NoSQL (MongoDB)
- **Database Name**: `school_competency_assessment`
- **Collections**: 2 main collections with embedded documents
- **Connection**: MongoDB Atlas or local MongoDB instance

---

## Database Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    MongoDB Database                         │
│              school_competency_assessment                   │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────────┐    ┌─────────────────────────────┐    │
│  │     users       │    │    assessment_questions     │    │
│  │   Collection    │    │       Collection            │    │
│  └─────────────────┘    └─────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
```

---

## Entity Relationship Diagram

```mermaid
erDiagram
    USERS {
        ObjectId _id PK
        String name
        String email UK
        String password
        String role
        String token
        Object otp
        Object assessmentResults
        Object certificate
        Date createdAt
        Date updatedAt
    }
    
    ASSESSMENT_QUESTIONS {
        ObjectId _id PK
        Object step1
        Object step2
        Object step3
        Date createdAt
        Date updatedAt
    }
    
    USERS ||--o{ ASSESSMENT_QUESTIONS : "takes"
    
    %% Embedded Documents
    USERS {
        Object otp {
            String code
            Date expiresAt
            Boolean isVerified
        }
        
        Object assessmentResults {
            Object step1 {
                Object A1 { Number score }
                Object A2 { Number score }
            }
            Object step2 {
                Object B1 { Number score }
                Object B2 { Number score }
            }
            Object step3 {
                Object C1 { Number score }
                Object C2 { Number score }
            }
        }
        
        Object certificate {
            String id UK
            Number score
            String status
            Date issueDate
            String certificateUrl
        }
    }
    
    ASSESSMENT_QUESTIONS {
        Object step1 {
            Array A1 { Object questions[] }
            Array A2 { Object questions[] }
        }
        Object step2 {
            Array B1 { Object questions[] }
            Array B2 { Object questions[] }
        }
        Object step3 {
            Array C1 { Object questions[] }
            Array C2 { Object questions[] }
        }
    }
    
    %% Question Structure
    Object questions {
        String statement
        Array options {
            String text
            Boolean isCorrect
        }
    }
```

---

## Collection/Table Structures

### 1. Users Collection

```javascript
{
  _id: ObjectId,
  name: {
    type: String,
    required: true,
    maxLength: 100
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    maxLength: 255
  },
  password: {
    type: String,
    required: true,
    minLength: 8
  },
  role: {
    type: String,
    required: true,
    enum: ['admin', 'student', 'supervisor'],
    default: 'student'
  },
  token: {
    type: String,
    required: false
  },
  otp: {
    code: {
      type: String,
      required: true,
      maxLength: 6
    },
    expiresAt: {
      type: Date,
      required: true
    },
    isVerified: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  assessmentResults: {
    step1: {
      A1: {
        score: {
          type: Number,
          required: true,
          default: 0,
          min: 0,
          max: 100
        }
      },
      A2: {
        score: {
          type: Number,
          required: true,
          default: 0,
          min: 0,
          max: 100
        }
      }
    },
    step2: {
      B1: {
        score: {
          type: Number,
          required: true,
          default: 0,
          min: 0,
          max: 100
        }
      },
      B2: {
        score: {
          type: Number,
          required: true,
          default: 0,
          min: 0,
          max: 100
        }
      }
    },
    step3: {
      C1: {
        score: {
          type: Number,
          required: true,
          default: 0,
          min: 0,
          max: 100
        }
      },
      C2: {
        score: {
          type: Number,
          required: true,
          default: 0,
          min: 0,
          max: 100
        }
      }
    }
  },
  certificate: {
    id: {
      type: String,
      required: true,
      unique: true,
      default: uuidv4()
    },
    score: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
      max: 100
    },
    status: {
      type: String,
      required: true,
      default: 'A1',
      enum: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2']
    },
    issueDate: {
      type: Date,
      required: true,
      default: new Date()
    },
    certificateUrl: {
      type: String,
      required: false
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}
```

### 2. Assessment Questions Collection

```javascript
{
  _id: ObjectId,
  step1: {
    A1: [{
      statement: {
        type: String,
        required: true,
        maxLength: 1000
      },
      options: [{
        text: {
          type: String,
          required: true,
          maxLength: 500
        },
        isCorrect: {
          type: Boolean,
          default: false
        }
      }]
    }],
    A2: [{
      statement: {
        type: String,
        required: true,
        maxLength: 1000
      },
      options: [{
        text: {
          type: String,
          required: true,
          maxLength: 500
        },
        isCorrect: {
          type: Boolean,
          default: false
        }
      }]
    }]
  },
  step2: {
    B1: [{
      statement: {
        type: String,
        required: true,
        maxLength: 1000
      },
      options: [{
        text: {
          type: String,
          required: true,
          maxLength: 500
        },
        isCorrect: {
          type: Boolean,
          default: false
        }
      }]
    }],
    B2: [{
      statement: {
        type: String,
        required: true,
        maxLength: 1000
      },
      options: [{
        text: {
          type: String,
          required: true,
          maxLength: 500
        },
        isCorrect: {
          type: Boolean,
          default: false
        }
      }]
    }]
  },
  step3: {
    C1: [{
      statement: {
        type: String,
        required: true,
        maxLength: 1000
      },
      options: [{
        text: {
          type: String,
          required: true,
          maxLength: 500
        },
        isCorrect: {
          type: Boolean,
          default: false
        }
      }]
    }],
    C2: [{
      statement: {
        type: String,
        required: true,
        maxLength: 1000
      },
      options: [{
        text: {
          type: String,
          required: true,
          maxLength: 500
        },
        isCorrect: {
          type: Boolean,
          default: false
        }
      }]
    }]
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}
```

---

## Relationships

### 1. Primary Relationships
- **Users ↔ Assessment Questions**: One-to-Many (One user can take multiple assessments)
- **Users ↔ OTP**: One-to-One (Each user has one active OTP)
- **Users ↔ Assessment Results**: One-to-One (Each user has one set of results)
- **Users ↔ Certificate**: One-to-One (Each user has one certificate)

### 2. Embedded Relationships
- **Assessment Results**: Embedded within User document
- **Certificate**: Embedded within User document
- **OTP**: Embedded within User document
- **Questions**: Embedded within Assessment Questions document

---

## Indexes

### Primary Indexes
```javascript
// Users Collection
db.users.createIndex({ "email": 1 }, { unique: true })
db.users.createIndex({ "certificate.id": 1 }, { unique: true })
db.users.createIndex({ "role": 1 })
db.users.createIndex({ "createdAt": -1 })

// Assessment Questions Collection
db.assessment_questions.createIndex({ "createdAt": -1 })
```

### Compound Indexes
```javascript
// Users Collection
db.users.createIndex({ "role": 1, "createdAt": -1 })
db.users.createIndex({ "certificate.status": 1, "certificate.score": -1 })
```

### Text Search Indexes
```javascript
// Users Collection
db.users.createIndex({ "name": "text", "email": "text" })

// Assessment Questions Collection
db.assessment_questions.createIndex({ 
  "step1.A1.statement": "text",
  "step1.A2.statement": "text",
  "step2.B1.statement": "text",
  "step2.B2.statement": "text",
  "step3.C1.statement": "text",
  "step3.C2.statement": "text"
})
```

---

## Data Flow

### 1. User Registration Flow
```
1. User submits registration form
2. System validates input data
3. Password is hashed using bcrypt
4. OTP is generated and stored
5. Email is sent with OTP
6. User document is created in database
```

### 2. Assessment Flow
```
1. User logs in and accesses assessment
2. System retrieves questions from assessment_questions collection
3. User answers questions
4. System calculates scores for each level
5. Results are stored in user's assessmentResults field
6. Certificate is generated and stored
```

### 3. Certificate Generation Flow
```
1. Assessment completion triggers certificate generation
2. System calculates overall score and determines level
3. Certificate ID is generated using UUID
4. Certificate data is stored in user document
5. Certificate URL is generated (if applicable)
```

---

## Security Considerations

### 1. Data Encryption
- **Passwords**: Hashed using bcrypt with salt rounds
- **JWT Tokens**: Signed with secret key
- **Sensitive Data**: Encrypted in transit using HTTPS

### 2. Access Control
- **Role-based Access**: admin, student, supervisor roles
- **JWT Authentication**: Token-based session management
- **OTP Verification**: Two-factor authentication for registration

### 3. Input Validation
- **Schema Validation**: Mongoose schema validation
- **Data Sanitization**: Input cleaning and validation
- **SQL Injection Prevention**: MongoDB parameterized queries

### 4. Audit Trail
- **Timestamps**: Created and updated timestamps on all documents
- **User Activity**: Track user actions and assessment attempts
- **Error Logging**: Comprehensive error logging and monitoring

---

## Performance Optimization

### 1. Query Optimization
- **Indexed Fields**: Proper indexing on frequently queried fields
- **Projection**: Select only required fields in queries
- **Aggregation**: Use MongoDB aggregation pipeline for complex queries

### 2. Caching Strategy
- **Question Caching**: Cache assessment questions in memory
- **User Session**: Cache user session data
- **Results Caching**: Cache assessment results for quick access

### 3. Database Optimization
- **Connection Pooling**: Optimize MongoDB connection pool
- **Read Preferences**: Use read replicas for read-heavy operations
- **Write Concerns**: Configure appropriate write concerns

### 4. Monitoring
- **Query Performance**: Monitor slow queries
- **Index Usage**: Track index utilization
- **Connection Metrics**: Monitor database connections

---

## Backup and Recovery

### 1. Backup Strategy
```bash
# Automated Daily Backup
mongodump --db school_competency_assessment --out /backup/daily/

# Weekly Full Backup
mongodump --db school_competency_assessment --out /backup/weekly/

# Monthly Archive
tar -czf /backup/monthly/$(date +%Y%m).tar.gz /backup/weekly/
```

### 2. Recovery Procedures
```bash
# Restore from backup
mongorestore --db school_competency_assessment /backup/daily/2024-01-15/

# Point-in-time recovery
mongorestore --db school_competency_assessment --oplogReplay /backup/oplog/
```

### 3. Data Retention
- **User Data**: Retain for 7 years (compliance requirement)
- **Assessment Results**: Retain indefinitely
- **Logs**: Retain for 1 year
- **Backups**: Retain for 3 years

---

## Database Migration and Versioning

### 1. Schema Versioning
```javascript
// Version tracking in documents
{
  _id: ObjectId,
  schemaVersion: {
    type: Number,
    default: 1
  },
  // ... other fields
}
```

### 2. Migration Scripts
```javascript
// Example migration script
const migrateUsers = async () => {
  const users = await User.find({});
  
  for (const user of users) {
    if (!user.schemaVersion) {
      user.schemaVersion = 1;
      user.certificate = {
        id: uuidv4(),
        score: 0,
        status: 'A1',
        issueDate: new Date()
      };
      await user.save();
    }
  }
};
```

---

## Monitoring and Maintenance

### 1. Health Checks
- **Connection Status**: Monitor database connectivity
- **Query Performance**: Track slow queries
- **Storage Usage**: Monitor disk space and growth

### 2. Maintenance Tasks
- **Index Optimization**: Regular index maintenance
- **Data Cleanup**: Remove expired OTPs and old sessions
- **Statistics Update**: Update database statistics

### 3. Alerting
- **High CPU Usage**: Alert on high database CPU
- **Connection Limits**: Alert on connection pool exhaustion
- **Backup Failures**: Alert on backup job failures

---

## Future Considerations

### 1. Scalability
- **Sharding**: Consider sharding for horizontal scaling
- **Read Replicas**: Implement read replicas for better performance
- **Microservices**: Split into microservices for better scalability

### 2. Additional Features
- **Audit Logs**: Separate collection for audit trails
- **Question Banks**: Separate collection for question management
- **Assessment Sessions**: Track individual assessment sessions
- **Analytics**: Dedicated analytics collection for reporting

### 3. Performance Improvements
- **Caching Layer**: Implement Redis for caching
- **CDN**: Use CDN for certificate downloads
- **Database Optimization**: Regular performance tuning

---

*This database design document should be updated as the system evolves and new requirements are added.*
