import 'package:flutter/material.dart';

void main() {
  runApp(const MeuApp());
}

class MeuApp extends StatelessWidget {
  const MeuApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Mural de Recados',
      theme: ThemeData(
        primarySwatch: Colors.blueGrey,
        useMaterial3: false, 
      ),
      home: const MuralRecados(),
    );
  }
}

class MuralRecados extends StatefulWidget {
  const MuralRecados({super.key});

  @override
  State<MuralRecados> createState() => _MuralRecadosState();
}

class _MuralRecadosState extends State<MuralRecados> {
  final TextEditingController _tituloCtrl = TextEditingController();
  final TextEditingController _mensagemCtrl = TextEditingController();

  final List<String> _titulos = [];
  final List<String> _mensagens = [];

  String? _erroTitulo;

  // Função
  void _publicarRecado() {
    String titulo = _tituloCtrl.text.trim();
    String mensagem = _mensagemCtrl.text.trim();

    setState(() {
      _erroTitulo = null;
    });

    if (titulo.length > 30) {
      setState(() {
        _erroTitulo = 'O título não pode ter mais de 30 caracteres.';
      });
      return;
    }

    if (titulo.isEmpty || mensagem.isEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Preencha o título e a mensagem para publicar!')),
      );
      return;
    }

    // Atualizacao do estado 
    setState(() {
      _titulos.insert(0, titulo);
      _mensagens.insert(0, mensagem);
    });

    // Limpa os campos
    _tituloCtrl.clear();
    _mensagemCtrl.clear();
  }

  @override
  void dispose() {
    _tituloCtrl.dispose();
    _mensagemCtrl.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Mural de Recados'),
        backgroundColor: Colors.blueGrey,
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            // 1 (Topo da tela)
            TextField(
              controller: _tituloCtrl,
              decoration: InputDecoration(
                labelText: 'Título do recado',
                border: const OutlineInputBorder(),
                errorText: _erroTitulo, 
              ),
            ),
            const SizedBox(height: 10),
            TextField(
              controller: _mensagemCtrl,
              maxLines: 3, 
              decoration: const InputDecoration(
                labelText: 'Texto da mensagem',
                border: OutlineInputBorder(),
              ),
            ),
            const SizedBox(height: 12),
            ElevatedButton(
              onPressed: _publicarRecado,
              style: ElevatedButton.styleFrom(
                padding: const EdgeInsets.all(15),
                backgroundColor: Colors.blueGrey,
              ),
              child: const Text('Publicar', style: TextStyle(color: Colors.white, fontSize: 16)),
            ),
            const SizedBox(height: 20),

            // 2. (Abaixo da entrada)
            Expanded(
              child: _titulos.isEmpty
                  ? const Center(
                      child: Text(
                        'Nenhum recado publicado.',
                        style: TextStyle(color: Colors.grey, fontSize: 16),
                      ),
                    )
                  : ListView.builder(
                      itemCount: _titulos.length,
                      itemBuilder: (context, index) {

                        String titulo = _titulos[index];
                        String mensagem = _mensagens[index];

                        return Card(
                          elevation: 2,
                          margin: const EdgeInsets.symmetric(vertical: 6),
                          child: ListTile(
                            leading: const Icon(
                              Icons.campaign, // Ícone à escolha
                              color: Colors.blueGrey,
                              size: 30,
                            ),
                            title: Text(
                              titulo,
                              style: const TextStyle(fontWeight: FontWeight.bold),
                            ),
                            subtitle: Text(mensagem),
                            
                            trailing: Text(
                              "#${_titulos.length - index}",
                              style: const TextStyle(
                                fontWeight: FontWeight.bold,
                                color: Colors.grey,
                              ),
                            ),
                          ),
                        );
                      },
                    ),
            ),
          ],
        ),
      ),
    );
  }
}
