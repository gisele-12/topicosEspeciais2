import 'package:flutter/material.dart';
import 'dart:math';

void main() => runApp(const MaterialApp(
  home: SimuladorInvestimentos(),
  debugShowCheckedModeBanner: false,
));

class SimuladorInvestimentos extends StatefulWidget {
  const SimuladorInvestimentos({super.key});

  @override
  _SimuladorInvestimentosState createState() => _SimuladorInvestimentosState();
}

class _SimuladorInvestimentosState extends State<SimuladorInvestimentos> {
 
  final TextEditingController _valorInicialController = TextEditingController();
  final TextEditingController _aporteMensalController = TextEditingController();
  final TextEditingController _taxaJurosController = TextEditingController();
  final TextEditingController _periodoController = TextEditingController();

  String _resultado = ''; // Resultado do cálculo
  bool _mostrarResultado = false; // Controla se o resultado deve ser exibido
  Color _corResultado = Colors.green; // Cor do resultado

 void _calcularInvestimento() {
    try {
      double valorInicial = double.parse(_valorInicialController.text);
      double aporteMensal = double.parse(_aporteMensalController.text);
      double taxaJuros = double.parse(_taxaJurosController.text);
      int periodo = int.parse(_periodoController.text);

      if (valorInicial < 0 || aporteMensal < 0 || taxaJuros < 0 || periodo <= 0) {
        _mostrarAlerta('Por favor, insira valores válidos e positivos!');
        return;
      }

      double i = taxaJuros / 100;

      // Fórmula de juros compostos com aportes:
      // M = P(1 + i)^n + A[(1 + i)^n - 1] / i
      // Onde:
      // M = Montante final
      // P = Capital inicial
      // i = Taxa de juros (em decimal)
      // n = Período (meses)
      // A = Aporte mensal

      double montanteFinal;

      if (i == 0) {
        // Se a taxa for 0%, apenas soma o capital inicial com os aportes
        montanteFinal = valorInicial + (aporteMensal * periodo);
      } else {
        double capitalInicial = valorInicial * pow(1 + i, periodo);
        double aportes = aporteMensal * ((pow(1 + i, periodo) - 1) / i);
        montanteFinal = capitalInicial + aportes;
      }

      double totalInvestido = valorInicial + (aporteMensal * periodo);

       if (montanteFinal > (totalInvestido * 2)) {
        _corResultado = const Color(0xFF00B894); // Verde Esmeralda
      } else {
        _corResultado = Colors.green;
      }

      setState(() {
        _resultado =
            'Em $periodo meses, você terá:\nR\$ ${montanteFinal.toStringAsFixed(2)}';
        _mostrarResultado = true;
      });
    } catch (e) {
      _mostrarAlerta('Por favor, preencha todos os campos corretamente!');
    }
  }

  void _mostrarAlerta(String mensagem) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(content: Text(mensagem)),
    );
  }

  void _limpar() {
    _valorInicialController.clear();
    _aporteMensalController.clear();
    _taxaJurosController.clear();
    _periodoController.clear();

    setState(() {
      _resultado = '';
      _mostrarResultado = false;
    });
  }

  Widget _buildTextField(
    TextEditingController controller,
    String label,
    String hint,
  ) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 8.0),
      child: TextField(
        controller: controller,
        keyboardType: TextInputType.number,
        decoration: InputDecoration(
          labelText: label,
          hintText: hint,
          border: OutlineInputBorder(
            borderRadius: BorderRadius.circular(8.0),
            borderSide: const BorderSide(color: Colors.green, width: 2.0),
          ),
          enabledBorder: OutlineInputBorder(
            borderRadius: BorderRadius.circular(8.0),
            borderSide: const BorderSide(color: Colors.green, width: 1.5),
          ),
          focusedBorder: OutlineInputBorder(
            borderRadius: BorderRadius.circular(8.0),
            borderSide: const BorderSide(color: Colors.green, width: 2.5),
          ),
          filled: true,
          fillColor: Colors.blue[50],
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text(
          'Simulador de Investimentos',
          style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
        ),
        centerTitle: true,
        backgroundColor: Colors.green[700],
        elevation: 0,
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(20.0),
        child: Column(
          children: [

            _buildTextField(
              _valorInicialController,
              'Valor Inicial (R\$)',
              'Ex: 1000',
            ),

            _buildTextField(
              _aporteMensalController,
              'Aporte Mensal (R\$)',
              'Ex: 100',
            ),

            // Campo: Taxa de Juros Mensal
            _buildTextField(
              _taxaJurosController,
              'Taxa de Juros Mensal (%)',
              'Ex: 1',
            ),

            _buildTextField(
              _periodoController,
              'Período (Meses)',
              'Ex: 12',
            ),

            const SizedBox(height: 30),

            SizedBox(
              width: double.infinity,
              child: ElevatedButton(
                onPressed: _calcularInvestimento,
                style: ElevatedButton.styleFrom(
                  backgroundColor: Colors.green[700],
                  padding: const EdgeInsets.symmetric(vertical: 16.0),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(30.0),
                  ),
                ),
                child: const Text(
                  'SIMULAR RENDIMENTO',
                  style: TextStyle(
                    fontSize: 16,
                    fontWeight: FontWeight.bold,
                    color: Colors.white,
                  ),
                ),
              ),
            ),

            const SizedBox(height: 20),

            SizedBox(
              width: double.infinity,
              child: OutlinedButton(
                onPressed: _limpar,
                style: OutlinedButton.styleFrom(
                  side: BorderSide(color: Colors.green[700]!, width: 2.0),
                  padding: const EdgeInsets.symmetric(vertical: 14.0),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(30.0),
                  ),
                ),
                child: Text(
                  'LIMPAR',
                  style: TextStyle(
                    fontSize: 16,
                    fontWeight: FontWeight.bold,
                    color: Colors.green[700],
                  ),
                ),
              ),
            ),

            const SizedBox(height: 30),

            if (_mostrarResultado)
              Container(
                padding: const EdgeInsets.all(20.0),
                decoration: BoxDecoration(
                  color: _corResultado.withOpacity(0.2),
                  borderRadius: BorderRadius.circular(12.0),
                  border: Border.all(color: _corResultado, width: 2.0),
                ),
                child: Text(
                  _resultado,
                  textAlign: TextAlign.center,
                  style: TextStyle(
                    fontSize: 20,
                    fontWeight: FontWeight.bold,
                    color: _corResultado,
                  ),
                ),
              ),
          ],
        ),
      ),
    );
  }

  @override
  void dispose() {
    _valorInicialController.dispose();
    _aporteMensalController.dispose();
    _taxaJurosController.dispose();
    _periodoController.dispose();
    super.dispose();
  }
}
