export default class QueryValidator {
    static isValidQuery(query: object[]): boolean {
      const availableQuery = ['q', 'from', 'to', 'sortBy', 'country', 'category', 'sources', 'domains'];
      const unavailableQuery:boolean[] = [];

      query.forEach(q => {
        if (availableQuery.some(e => e === q['type']) === false) {
          unavailableQuery.push(false);
        }
      })

      return !(unavailableQuery.some(e => e === false));
    }
}