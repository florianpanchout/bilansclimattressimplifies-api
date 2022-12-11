const valid = {
  raisonSociale: 'Raison sociale',
  nombreSalaries: 100,
  siren: 12,
  naf: '90',
  region: '4',
  annee: 2021,
}
const invalid = {
  notEnoughEmployees: {
    raisonSociale: 'Raison sociale',
    nombreSalaries: 32,
    siren: 12,
    naf: '90',
    region: '4',
    annee: 2021,
  },
  tooManyEmployees: {
    raisonSociale: 'Raison sociale',
    nombreSalaries: 620,
    siren: 12,
    naf: '90',
    region: '4',
    annee: 2021,
  },
  noRaisonSociale: {
    nombreSalaries: 100,
    siren: 12,
    naf: '90',
    region: '4',
    annee: 2021,
  },
  noSiren: {
    raisonSociale: 'Raison sociale',
    nombreSalaries: 100,
    naf: '90',
    region: '4',
    annee: 2021,
  },
  noNaf: {
    raisonSociale: 'Raison sociale',
    nombreSalaries: 100,
    siren: 12,
    region: '4',
    annee: 2021,
  },
  noRegion: {
    raisonSociale: 'Raison sociale',
    nombreSalaries: 100,
    siren: 12,
    naf: '90',
    annee: 2021,
  },
  noAnnee: {
    raisonSociale: 'Raison sociale',
    nombreSalaries: 100,
    siren: 12,
    naf: '90',
    region: '4',
  },
}

module.exports = { valid, invalid }
