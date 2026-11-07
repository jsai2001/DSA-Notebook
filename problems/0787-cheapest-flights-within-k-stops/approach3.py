class Solution(object):
    def findCheapestPrice(self, n, flights, src, dst, k):
        INF = float("inf")  # @viz init
        price = [INF] * n  # price[v] = the cheapest way to v using at most `round` flights  # @viz init
        price[src] = 0  # @viz init
        for _ in range(k + 1):  # k stops = k + 1 flights: one round per flight  # @viz round
            new = price[:]  # read last round's prices only, so one round adds at most one flight  # @viz round
            for u, v, p in flights:  # @viz relax
                if price[u] + p < new[v]:  # @viz relax
                    new[v] = price[u] + p  # @viz relax
            if new == price:  # nothing got cheaper: more rounds won't help  # @viz stop
                break  # @viz stop
            price = new  # @viz round
        return -1 if price[dst] == INF else price[dst]  # @viz return
