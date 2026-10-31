# Definition for singly-linked list.
# class ListNode(object):
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution(object):
    def mergeTwoLists(self, list1, list2):
        dummy = tail = ListNode()  # dummy in front, so the first node isn't a special case  # @viz init
        while list1 and list2:  # @viz loop
            if list1.val <= list2.val:  # take the smaller head (list1 on a tie)  # @viz pick
                tail.next = list1  # @viz left
                list1 = list1.next  # @viz left
            else:
                tail.next = list2  # @viz right
                list2 = list2.next  # @viz right
            tail = tail.next  # @viz advance
        tail.next = list1 or list2  # one list is used up: attach the rest of the other  # @viz rest
        return dummy.next  # @viz return
