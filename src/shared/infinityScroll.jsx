import React from 'react';
import _ from 'lodash';
import { Spinner } from '../elements';

const InfinityScroll = (props) => {
  const { children, callNext, is_next, loading } = props;

  // 쓰로틀을 적용
  const _handleScroll = _.throttle(() => {
    if (loading) {
      return false;
    }
    const { scrollHeight } = document.body; // 화면 전체 높이
    const { innerHeight } = window; // 현재 document 높이
    const scrollTop =
      (document.documentElement && document.documentElement.scrollTop) ||
      document.body.scrollTop; // 위에서부터 움직인 스크롤 높이

    if (scrollHeight - (innerHeight + scrollTop) < 100) {
      callNext();
    }
  }, 300);

  const handleScroll = React.useCallback(_handleScroll, [loading]);

  React.useEffect(() => {
    // 로딩 중이면, return!
    if (loading) {
      return;
    }

    // 다음 포스트 있는지 체크
    if (is_next) {
      window.addEventListener('scroll', handleScroll);
    } else {
      window.removeEventListener('scroll', handleScroll);
    }

    // 클린업, 컴포넌트 없어질때 호출
    return () => window.removeEventListener('scroll', handleScroll);
  }, [is_next, loading]);

  return (
    <React.Fragment>
      {children}
      {is_next && <Spinner />}
    </React.Fragment>
  );
};

InfinityScroll.defaultProps = {
  children: null,
  callNext: () => {},
  is_next: false,
  loading: false,
};

export default InfinityScroll;
