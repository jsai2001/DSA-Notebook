from bisect import bisect_left
class Solution(object):
    def minInterval(self, intervals, queries):
        qs = sorted(set(queries))  # the different query points, in order  # @viz init
        size = [-1] * len(qs)  # answer for each point  # @viz init
        nxt = list(range(len(qs) + 1))  # nxt[i] leads to the first unanswered point at or after i  # @viz init
        def find(i):  # follow nxt, shortening the path as we go  # @viz init
            root = i  # @viz init
            while nxt[root] != root:  # @viz init
                root = nxt[root]  # @viz init
            while nxt[i] != root:  # @viz init
                nxt[i], i = root, nxt[i]  # @viz init
            return root  # @viz init
        for l, r in sorted(intervals, key=lambda iv: iv[1] - iv[0]):  # smallest interval first  # @viz interval
            i = find(bisect_left(qs, l))  # first unanswered point inside [l, r]  # @viz interval
            while i < len(qs) and qs[i] <= r:  # every unanswered point it covers: this is their smallest  # @viz fill
                size[i] = r - l + 1  # @viz fill
                nxt[i] = i + 1  # answered: skip it from now on  # @viz fill
                i = find(i + 1)  # @viz fill
        at = {q: size[i] for i, q in enumerate(qs)}  # @viz return
        return [at[q] for q in queries]  # @viz return
