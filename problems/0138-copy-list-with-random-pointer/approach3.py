# Definition for a Node.
# class Node:
#     def __init__(self, x, next=None, random=None):
#         self.val = int(x)
#         self.next = next
#         self.random = random
class Solution(object):
    def copyRandomList(self, head):
        if not head:  # @viz init
            return None  # @viz init
        cur = head  # @viz weave
        while cur:  # step 1: A -> B becomes A -> A' -> B -> B'  # @viz weave
            cur.next = Node(cur.val, cur.next)  # @viz weave
            cur = cur.next.next  # @viz weave
        cur = head  # @viz random
        while cur:  # step 2: the copy of X.random sits right after X.random  # @viz random
            if cur.random:  # random can be None  # @viz random
                cur.next.random = cur.random.next  # @viz random
            cur = cur.next.next  # @viz random
        new_head = head.next  # @viz split
        cur = head  # @viz split
        while cur:  # step 3: pull the copies out and put the original back  # @viz split
            copy = cur.next  # @viz split
            cur.next = copy.next  # @viz split
            copy.next = copy.next.next if copy.next else None  # @viz split
            cur = cur.next  # @viz split
        return new_head  # @viz return
