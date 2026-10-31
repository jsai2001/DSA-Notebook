# Definition for singly-linked list.
# class ListNode(object):
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
import heapq
class Solution(object):
    def mergeKLists(self, lists):
        dummy = tail = ListNode()  # @viz init
        # one head per non-empty list; i breaks ties, so two nodes are never compared
        heap = [(head.val, i, head) for i, head in enumerate(lists) if head]  # @viz heads
        heapq.heapify(heap)  # @viz heads
        while heap:  # @viz pop
            _, i, node = heapq.heappop(heap)  # the smallest of all the current heads  # @viz pop
            tail.next = node  # @viz attach
            tail = node  # @viz attach
            if node.next:  # the next node of the same list takes its place  # @viz push
                heapq.heappush(heap, (node.next.val, i, node.next))  # @viz push
        return dummy.next  # @viz return
