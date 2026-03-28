# AliasKit SDK Examples — Framework Integration Guide

This document provides ready-to-use examples for integrating AliasKit with popular agent and automation frameworks.

---

## 1. LangChain Agent with AliasKit Identity

**Use Case:** Create a LangChain agent that provisions an identity and uses it to sign up for services.

### Installation

```bash
npm install @aliaskit/sdk langchain @langchain/core @langchain/openai
```

### Code

```typescript
import { AliasKit } from '@aliaskit/sdk'
import { initializeAgentExecutorWithOptions } from 'langchain/agents'
import { ChatOpenAI } from '@langchain/openai'
import { Tool } from 'langchain/tools'

// Step 1: Initialize AliasKit client
const aliasKit = new AliasKit({
  apiKey: process.env.ALIASKIT_API_KEY!,
  baseUrl: process.env.ALIASKIT_BASE_URL,
})

// Step 2: Create LangChain tools for identity operations
class ProvisionIdentityTool extends Tool {
  name = 'provision_identity'
  description = 'Provision a new email and phone identity for the agent'

  async _call(input: string): Promise<string> {
    try {
      const identity = await aliasKit.identities.create({
        name: input || 'Agent Identity',
        metadata: { created_at: new Date().toISOString() },
      })
      return JSON.stringify({
        success: true,
        identityId: identity.id,
        email: identity.email.address,
        phone: identity.phone?.number,
      })
    } catch (error) {
      return JSON.stringify({ success: false, error: String(error) })
    }
  }
}

class SendEmailTool extends Tool {
  name = 'send_email'
  description = 'Send an email from the agent identity'

  async _call(input: string): Promise<string> {
    try {
      const [identityId, to, subject, body] = input.split('|||')
      await aliasKit.identities.sendEmail(identityId, {
        to,
        subject,
        body_text: body,
      })
      return JSON.stringify({ success: true, message: 'Email sent' })
    } catch (error) {
      return JSON.stringify({ success: false, error: String(error) })
    }
  }
}

// Step 3: Create agent
async function runLangChainAgent() {
  const tools = [new ProvisionIdentityTool(), new SendEmailTool()]

  const llm = new ChatOpenAI({
    model: 'gpt-4',
    temperature: 0,
  })

  const executor = await initializeAgentExecutorWithOptions(tools, llm, {
    agentType: 'openai-functions',
    verbose: true,
  })

  const result = await executor.invoke({
    input: `
      1. Provision a new agent identity named "Newsletter Bot"
      2. Send a test email from that identity to newsletter@example.com
    `,
  })

  console.log('Agent result:', result)
}

runLangChainAgent()
```

### Output Example

```
Agent provisions identity:
  - ID: ident_abc123
  - Email: agent.abc123@aliaskit.io
  - Phone: +1-555-0123

Agent sends email:
  - To: newsletter@example.com
  - Subject: Agent confirmation
  - Status: Sent ✓
```

---

## 2. Crew.ai Multi-Agent with Shared Identity

**Use Case:** Create a Crew.ai crew where agents share a provisioned identity for coordinated actions.

### Installation

```bash
pip install crewai @aliaskit/sdk
npm install @aliaskit/sdk  # For the SDK in Node wrapper
```

### Code (Python + Node bridge)

```python
from crewai import Agent, Task, Crew
import subprocess
import json

# Helper: Provision identity via Node
def provision_identity(name):
    js_code = f"""
    const {{ AliasKit }} = require('@aliaskit/sdk');
    const client = new AliasKit({{
      apiKey: process.env.ALIASKIT_API_KEY,
      baseUrl: process.env.ALIASKIT_BASE_URL,
    }});

    client.identities.create({{ name: '{name}' }})
      .then(identity => console.log(JSON.stringify(identity)))
      .catch(err => console.error(err));
    """
    result = subprocess.run(['node', '-e', js_code], capture_output=True, text=True)
    return json.loads(result.stdout)

# Step 1: Provision shared crew identity
crew_identity = provision_identity("Support Crew")
shared_email = crew_identity['email']['address']
shared_phone = crew_identity['phone']['number']

# Step 2: Define crew agents
coordinator = Agent(
    role='Coordinator',
    goal='Coordinate support requests using shared identity',
    backstory=f'A coordinator with access to shared identity: {shared_email}'
)

responder = Agent(
    role='Support Responder',
    goal='Respond to inquiries using the shared identity',
    backstory=f'Support agent with access to shared email: {shared_email}'
)

# Step 3: Define tasks
provision_task = Task(
    description='Confirm the support crew identity is provisioned',
    expected_output='Identity confirmation with email and phone',
    agent=coordinator
)

respond_task = Task(
    description='Send welcome email to new support requests',
    expected_output='Email confirmation sent',
    agent=responder
)

# Step 4: Create crew
support_crew = Crew(
    agents=[coordinator, responder],
    tasks=[provision_task, respond_task],
    verbose=True
)

# Execute
result = support_crew.kickoff()
print(f"Crew execution result: {result}")
```

### Alternative: Pure Node.js Crew Example

```typescript
import { AliasKit } from '@aliaskit/sdk'

interface Agent {
  name: string
  role: string
  task: (identityId: string) => Promise<string>
}

// Create agents
const agents: Agent[] = [
  {
    name: 'Lead Generator',
    role: 'Find and contact prospects',
    task: async (identityId) => {
      // Use shared identity to send outreach emails
      return `Generated 10 leads from ${identityId}`
    },
  },
  {
    name: 'Follow-up Specialist',
    role: 'Follow up with prospects',
    task: async (identityId) => {
      // Use shared identity to send follow-ups
      return `Sent 5 follow-up emails from ${identityId}`
    },
  },
]

// Crew execution
async function executeCrew() {
  const aliasKit = new AliasKit({
    apiKey: process.env.ALIASKIT_API_KEY!,
  })

  // Provision shared crew identity
  const crewIdentity = await aliasKit.identities.create({
    name: 'Sales Crew',
    metadata: { crew_type: 'sales_outreach' },
  })

  console.log(`Crew identity provisioned: ${crewIdentity.email.address}`)

  // Execute agents with shared identity
  for (const agent of agents) {
    const result = await agent.task(crewIdentity.id)
    console.log(`${agent.name}: ${result}`)
  }
}

executeCrew()
```

---

## 3. Basic Node.js / Deno / Browser Usage

**Use Case:** Simple SDK usage for provisioning identities and managing email/phone.

### Installation

```bash
npm install @aliaskit/sdk
```

### Code

```typescript
import { AliasKit } from '@aliaskit/sdk'

const aliasKit = new AliasKit({
  apiKey: process.env.ALIASKIT_API_KEY!,
  baseUrl: 'https://api.aliaskit.io/v1',
})

// Create identity
const identity = await aliasKit.identities.create({
  name: 'Test User',
  metadata: { source: 'sdk_example' },
})

console.log('Identity created:')
console.log(`  ID: ${identity.id}`)
console.log(`  Email: ${identity.email.address}`)
console.log(`  Phone: ${identity.phone?.number}`)

// List identities
const list = await aliasKit.identities.list({ limit: 10 })
console.log(`\nTotal identities: ${list.total}`)

// Get specific identity
const retrieved = await aliasKit.identities.get(identity.id)
console.log(`\nRetrieved: ${retrieved.name}`)

// Send email
await aliasKit.identities.sendEmail(identity.id, {
  to: 'recipient@example.com',
  subject: 'Hello from AliasKit',
  body_text: 'This email is from an AliasKit identity!',
})

console.log('\nEmail sent from identity')

// Update identity
await aliasKit.identities.update(identity.id, {
  name: 'Updated Name',
  metadata: { updated: true },
})

console.log('Identity updated')

// Delete identity
await aliasKit.identities.delete(identity.id)
console.log('Identity deleted')
```

---

## 4. n8n Workflow — Automated Identity Provisioning

**Use Case:** Automate identity provisioning in n8n workflows with Webhook triggers.

### Setup Steps

1. **Create n8n Webhook trigger**
   - Trigger type: "Webhook"
   - Method: POST
   - Path: `/provision-agent-identity`

2. **Add HTTP request node**
   - URL: `https://api.aliaskit.io/v1/identities`
   - Method: POST
   - Headers:
     ```
     Authorization: Bearer {{ $env.ALIASKIT_API_KEY }}
     Content-Type: application/json
     ```
   - Body:
     ```json
     {
       "name": "{{ $json.agent_name }}",
       "metadata": {
         "workflow_id": "{{ $json.workflow_id }}",
         "created_by": "n8n"
       }
     }
     ```

3. **Extract identity data**
   - Create JSON output node to format response:
     ```json
     {
       "identity_id": "{{ $json.id }}",
       "email": "{{ $json.email.address }}",
       "phone": "{{ $json.phone.number }}",
       "status": "provisioned"
     }
     ```

4. **Send notification (optional)**
   - Add Email node to notify on successful provisioning
   - Add Slack node for team awareness

### Example Webhook Call

```bash
curl -X POST http://localhost:5678/webhook/provision-agent-identity \
  -H "Content-Type: application/json" \
  -d '{
    "agent_name": "Support Bot",
    "workflow_id": "sales_automation_01"
  }'
```

### Response

```json
{
  "identity_id": "ident_xyz789",
  "email": "agent.xyz789@aliaskit.io",
  "phone": "+1-555-9876",
  "status": "provisioned"
}
```

---

## Framework Integration Checklist

### LangChain
- [x] Agent tools for identity provisioning
- [x] Tool for sending emails from agent
- [x] Example agent that coordinates identity setup
- [ ] Official LangChain Marketplace listing
- [ ] Integration guide in LangChain docs

### Crew.ai
- [x] Multi-agent crew with shared identity
- [x] Task delegation with identity context
- [ ] Crew.ai community example
- [ ] Official Crew.ai documentation mention

### n8n
- [x] Workflow webhook template
- [x] HTTP request configuration
- [ ] Official n8n community recipe
- [ ] Community node (optional)

### Next Steps (Post-Launch)
1. Monitor framework communities for adoption
2. Collect feedback from early users
3. Refine examples based on real-world usage
4. Submit to official marketplace/listings
5. Create video tutorials for each framework

---

## Support & Feedback

- **GitHub Issues:** github.com/AryaaSk/aliaskit/issues
- **Discussions:** github.com/AryaaSk/aliaskit/discussions
- **Email:** partnerships@aliaskit.io

