/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode() : val(0), next(nullptr) {}
 *     ListNode(int x) : val(x), next(nullptr) {}
 *     ListNode(int x, ListNode *next) : val(x), next(next) {}
 * };
 */
#include <vector>
class Solution {
public:
    ListNode* mergeKLists(std::vector<ListNode*>& lists) {
        if (lists.empty()) return nullptr; // k = 0: nothing to merge // @viz empty
        size_t step = 1; // lists[i] and lists[i + step] are the pairs to merge this round // @viz init
        while (step < lists.size()) { // @viz round
            for (size_t i = 0; i + step < lists.size(); i += 2 * step) // @viz pair
                lists[i] = mergeTwo(lists[i], lists[i + step]); // @viz pair
            step *= 2; // half as many lists, each about twice as long // @viz double
        }
        return lists[0]; // @viz return
    }
private:
    ListNode* mergeTwo(ListNode* a, ListNode* b) { // Merge Two Sorted Lists (LeetCode 21)
        ListNode dummy;
        ListNode* tail = &dummy;
        while (a && b) {
            if (a->val <= b->val) {
                tail->next = a;
                a = a->next;
            } else {
                tail->next = b;
                b = b->next;
            }
            tail = tail->next;
        }
        tail->next = a ? a : b;
        return dummy.next;
    }
};
