# Remoção das opções de criação de conta de instituição

## Descrição

Removidas as opções de criação de conta de instituição na interface de cadastro. Agora todas as novas contas são registradas como doadores por padrão, e o gerenciamento de contas de instituição será feito exclusivamente pelo backend.

## Alterações realizadas

- Removido o estado `isInstitution` na página de autenticação
- Removido o checkbox 'Sou uma instituição religiosa' da interface de cadastro
- Modificada a função `handleSignUp` para sempre definir `is_institution` como `false`
- Atualizada a função `signUp` no contexto de autenticação para sempre definir `is_institution` como `false`
- Removida a lógica de criação automática de instituição
- Simplificada a mensagem de sucesso para refletir apenas a criação de conta de doador

## Commit relacionado

- 5e2067a: refactor: remove opções de criação de conta de instituição