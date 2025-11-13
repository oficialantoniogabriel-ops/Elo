ELO.AO - Versão segura (sem a anon key)
Como usar:
1) Depois de baixar, abre a pasta e edita o arquivo `index.html` na linha onde está:
   const SUPABASE_ANON_KEY = "REPLACE_WITH_SUPABASE_ANON_KEY";
   Troca REPLACE_WITH_SUPABASE_ANON_KEY pela tua anon key do Supabase.
2) Alternativa (mais segura): não coloque a chave no arquivo. Em vez disso, no Vercel/Netlify define a variável de ambiente SUPABASE_ANON_KEY e no index.html usa uma pequena alteração para buscar do ambiente (ve o deploy guide no README).
3) Fazer deploy: subir essa pasta para Vercel/Netlify/GitHub Pages.
4) Se precisares, eu faço o passo a passo para o Vercel (posso guiar no telemóvel).

OBS: Mantive o SUPABASE_URL já preenchido porque a URL é pública e segura. Não partilhes a anon key em links públicos.
