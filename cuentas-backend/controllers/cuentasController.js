import cuentas from '../data/cuentas.js';

export const getAllCuentas = (req, res) => {
  res.json({
    count: cuentas.length,
    data: cuentas
  });
};

export const getCuentaById = (req, res) => {
  const { id } = req.params;
  const cuenta = cuentas.find(c => c._id === id);

  res.json({
    finded: !!cuenta,
    account: cuenta || null
  });
};

export const getCuentasByQuery = (req, res) => {
  const { queryParam } = req.query;

  if (!queryParam) return res.json({ finded: false, data: [] });

  const resultados = cuentas.filter(c =>
    c._id === queryParam ||
    c.client.toLowerCase() === queryParam.toLowerCase() ||
    c.client.toLowerCase().includes(queryParam.toLowerCase()) ||
    c.gender.toLowerCase() === queryParam.toLowerCase()
  );

  if (resultados.length === 1) {
    return res.json({ finded: true, account: resultados[0] });
  } else {
    return res.json({ finded: resultados.length > 0, data: resultados });
  }
};

export const getCuentasBalance = (req, res) => {
  const activas = cuentas.filter(c => c.isActive);
  const total = activas.reduce((sum, c) => sum + parseFloat(c.balance.replace('$', '').replace(',', '')), 0);

  res.json({
    status: activas.length > 0,
    accountBalance: `$${total.toFixed(2)}`,
    activeAccounts: activas.length,
  });
};
